<template lang="pug">
  tr
    td
      router-link.link(:to='`/business/annual_reviews/${item.id}`') {{ item.name }}
    td
      .reviews-table__progress.d-flex.align-items-center
        .reviews-table__progress-numbers.mr-2(:class="progressWidth === 100 ? 'text-success' : 'text-dark'") {{ item.progress }}/{{ item.review_categories.length }}
        b-progress.w-100(:value="progressWidth" :max="100" show-progress variant="success")
    td.text-right {{ item.findings }}
    td.text-right {{ item.updated_at | asDate }}
    td.text-right {{ item.created_at | asDate }}
    td.text-right {{ item.review_end | asDate }}
    td.text-right
      .actions
        b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
          template(#button-content)
            b-icon(icon="three-dots")
          router-link.dropdown-item(:to='`/business/annual_reviews/${item.id}`') Edit
          b-dropdown-item(v-if="!(plan === 'team' && reviews.length === 1)" @click="duplicateReview(item.id)") Duplicate
          AnnualModalDelete(@deleteConfirmed="deleteReview(item.id)", :inline="false")
            b-dropdown-item.delete Delete
          b-dropdown-item.d-none
            a.link(:href="item.pdf_url" target="_blank") Download
</template>

<script>
import AnnualModalDelete from '../modals/AnnualModalDelete'
import { mapGetters } from "vuex"

export default {
  name: "ReviewItem",
  props: ['item'],
  components: {
    AnnualModalDelete
  },
  computed: {
    ...mapGetters({
      reviews: 'annual/reviews',
      plan: 'roles/currentPlan',
    }),
    progressWidth() {
      const part = 100 / +this.item.review_categories.length
      return +part * +this.item.progress
    }
  },
  methods: {
    duplicateReview(reviewId){
      this.$store.dispatch('annual/duplicateReview', { id: reviewId })
        .then(response => this.toast('Success', `Internal review has been duplicated.`))
        .catch(error => this.toast('Error', `Internal review has not been duplicated. Please try again.`, true))
    },
    deleteReview(reviewId){
      this.$store.dispatch('annual/deleteReview', { id: reviewId })
        .then(response => this.toast('Success', `Internal review has been deleted.`))
        .catch(error => this.toast('Error', `Internal review has not been deleted. Please try again.`, true))
    }
  }
}
</script>

<style scoped>

</style>
