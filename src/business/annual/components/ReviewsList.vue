<template lang="pug">
  .review__list
    ReviewLink(
      :annual-id="annualId"
      :current-id="currentId"
      :general="general"
      :checked="generalComplete"
    )
    template(v-for="(reviewCategory, index) in reviewsCategoriesSorted")
      ReviewLink(
        :title="reviewCategory.name"
        :checked="reviewCategory.complete"
        :id="reviewCategory.id"
        :annual-id="annualId"
        :current-id="currentId"
        :key="index"
      )
    .review__category-add
      button.btn.btn-default(v-if="!category.visible" @click="category.visible = true")
        b-icon.mr-2(icon='plus-circle-fill')
        | New Category
      .review__category-add__form(v-else)
        input.form-control(v-model="category.name" type="text" ref="input" @keyup.enter="onCategoryNameChange" @blur="addCategory")

</template>

<script>
import { mapActions } from "vuex"
import ReviewLink from "./ReviewLink";

export default {
  name: "ReviewsList",
  props: ['annualId', 'reviewsCategories', 'currentId', 'general', 'generalComplete'],
  data() {
    return {
      category: {
        visible: false,
        name: ""
      }
    }
  },
  components: {
    ReviewLink
  },
  computed: {
    reviewsCategoriesSorted() {
      return this.reviewsCategories.sort((a, b) => a.id - b.id);
    }
  },
  methods: {
    ...mapActions({
      createReviewCategory: 'annual/createReviewCategory',
      getCurrentReviewReview: 'annual/getCurrentReview'
    }),
    onCategoryNameChange() {
      this.category.visible = false
      return
    },
    async addCategory () {
      if (this.category.name.length === 0) {
        this.category.visible = false
        return
      }
      const reviewCategory = this.category
      const id = this.annualId
      const dataToSend = {
        annualId: this.annualId,
        name: reviewCategory.name,
        complete: false
      }
      try {
        this.category.visible = false
        const response = await this.createReviewCategory(dataToSend)
        if (response) {
          await this.getCurrentReviewReview(id)
          this.category.name = ''
          this.$router.push(`/business/annual_reviews/${response.annual_report_id}/${response.id}`)
          this.toast('Success', "Category has been added.")
        } else {
          this.toast('Error', 'Category has not been added. Please try again.')
        }
      } catch (error) {
        this.toast('Error', error.message, true)
      }
    },
  }
}
</script>

<style scoped>

</style>
