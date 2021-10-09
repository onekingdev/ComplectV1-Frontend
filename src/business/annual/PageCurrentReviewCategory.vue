<template lang="pug">
  .page.review
    .page-header.bg-white
      div
        h2.page-header__breadcrumbs Internal Review
        h2.page-header__title: b {{ review ? review.name : '' }}
      .page-header__actions
        div
          span.dowloading.list-page.mr-3.mt-2(v-if="isDowloading")
            .lds-ring.lds-ring-small
              div
              div
              div
              div
          button.btn.btn-default.mr-3(v-else @click="download") Download
          button.btn.btn-dark.mr-3(@click="saveAndExit()") Save and Exit
          button.btn.btn__close(@click="backToList")
            b-icon(icon="x")

    b-tabs.reviews__tabs(content-class="mt-0" v-if="review")
      template(#tabs-end)
        b-dropdown.actions(text="Actions" variant="default" right)
          template(#button-content)
            | Actions
            b-icon.ml-2(icon="chevron-down")
          AnnualModalEdit(:review="review || {}" :inline="false")
            b-dropdown-item Edit
          AnnualModalDelete(@deleteConfirmed="deleteReview(review.id)" :inline="false")
            b-dropdown-item.delete Delete
      b-tab(title="Detail" active)
        .p-x-40
          .row
            .col-md-3
              ReviewsList(
                :annual-id="annualId"
                :current-id="revcatId"
                :reviews-categories="review.review_categories"
              )
            .col-md-9.m-b-40
              .card-body.white-card-body.reviews__card
                .reviews__card--internal.pt-0
                  .row
                    .col-md-9.col-lg-9.col-xl-10
                      h3
                        input.editable-category-name(v-model="currentCategory.name" placeholder="Enter category name")
                      Errors(:errors="errors")
                    .col-md-3.col-lg-3.col-xl-2.text-right.reviews__card--actions
                      CommonDeleteModal.ml-auto(title="Delete Category" content="This will remove the category from this internal review and all of its associated content." @deleteConfirmed="deleteCategory(currentCategory.id)", :inline="false")
                        b-button.btn.btn-primary(variant="light") Delete
                .reviews__topiclist(v-if="currentCategory.review_topics")
                  template(v-for="(currentTopic, i) in currentCategory.review_topics")
                    .reviews__card--internal(:key="`${currentCategory.name}-${i}`")
                      .row.m-b-2
                        .col-md-9.col-lg-9.col-xl-10
                          textarea-autosize.reviews__input.reviews__topic-name.rounded(v-model="currentTopic.name" :min-height="30" placeholder="New Topic")
                        .col-md-3.col-lg-3.col-xl-2.text-right.reviews__card--actions
                          b-dropdown(size="xs" variant="light" class="m-0 p-0" right)
                            template(#button-content)
                              | Actions
                              b-icon.ml-2(icon="chevron-down")
                            b-dropdown-item(@click="addTopicItem(i)") New Item
                            TaskFormModal(@saved="newTasksEtag" :defaults="{ linkable_type: 'AnnualReport', linkable_id: review.id }" :inline="false")
                              b-dropdown-item New Task
                            CommonDeleteModal.ml-auto(title="Delete Topic" content="This will remove the topic from this internal review and all of its associated content." @deleteConfirmed="deleteTopic(i)", :inline="false")
                              b-dropdown-item.delete Delete
                      template(v-for="(topicItem, topicItemIndex) in currentTopic.items")
                        .row.mb-2(:key="`${currentCategory.name}-${i}-${topicItemIndex}`")
                          .col-md-2.col-lg-2.col-xl-1
                            .reviews__checkbox.d-flex.justify-content-between
                              .reviews__checkbox-item.reviews__checkbox-item--true(@click="topicItem.checked = true" :class="{ 'checked': topicItem.checked }")
                                b-icon(icon="check2")
                              .reviews__checkbox-item.reviews__checkbox-item--false(@click="topicItem.checked = false" :class="{ 'checked': !topicItem.checked }")
                                b-icon(icon="x")
                          .col-md-7.col-lg-7.col-xl-9.new-item-text
                            textarea-autosize.reviews__input.reviews__topic-body(v-model="topicItem.body" placeholder="New Item")
                          .col-md-3.col-lg-3.col-xl-2.text-right.reviews__card--dropdown
                            b-dropdown(size="xs" variant="light" class="m-0 p-0" right)
                              template(#button-content)
                                b-icon(icon="three-dots")
                              b-dropdown-item(@click="addFindings(i, topicItemIndex)") Log Finding
                              CommonDeleteModal.ml-auto(title="Delete Item" content="This will remove the item from this internal review and all of its associated content." @deleteConfirmed="deleteTopicItem(i, topicItemIndex)", :inline="false")
                                b-dropdown-item.delete Delete
                          .col-md-11.offset-md-1(v-if="topicItem.findings.length")
                            label.form-label Finding
                          template(v-for="(finding, findingIndex) in topicItem.findings")
                            .col-md-10.offset-md-1(:key="`${currentTopic.name}-${i}-${topicItemIndex}-${findingIndex}`")
                              textarea-autosize.finding-area.form-control.m-b-1(v-model="currentCategory.review_topics[i].items[topicItemIndex].findings[findingIndex]" type="text")
                              button.btn.btn__close.float-right.m-t-05(@click="removeFinding(i, topicItemIndex, findingIndex)")
                                b-icon(icon="x" font-scale="1")
                .reviews__card--internal.borderless.p-t-20
                  .d-flex.justify-content-between.align-items-center
                    button.btn.btn-default(@click="addTopic")
                      b-icon.mr-2(icon='plus-circle-fill')
                      | New Topic
                    .d-flex.justify-content-end
                      button.btn.btn-default.mr-2(@click="saveCategory") Save
                      button.btn(v-if="currentCategory.complete" :class="'btn-dark'" @click="markComplete") Mark as Incomplete
                      AnnualModalComplite(v-else @compliteConfirmed="markComplete", :completedStatus="currentCategory.complete" :name="currentCategory.name" :inline="false")
                        button.btn(:class="'btn-dark'") Mark as Complete
      b-tab(title="Tasks")
        Get(:reviewModel="`/api/business/annual_reports/${review.id}`" :etag="tasksEtag"): template(v-slot="{ reviewModel }")
          .container: .row.p-x-1: .col: .card
            TaskTableExtended(:tasks="reviewModel.reminders" :task-defaults="{ linkable_type: 'AnnualReport', linkable_id: reviewModel.id }" @saved="newTasksEtag")
      b-tab(title="Documents")
        .card-body.card-body_full-height.h-100: .card
            DocumentList(v-if="review" :review="review")
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import ReviewsList from "./components/ReviewsList";
import AnnualModalComplite from './modals/AnnualModalComplite'
import AnnualModalEdit from './modals/AnnualModalEdit'
import AnnualModalDelete from './modals/AnnualModalDelete'
import CommonDeleteModal from '@/common/Modals/CommonDeleteModal'
import TaskFormModal from '@/common/TaskFormModal'
import TaskTableExtended from '@/common/TaskTableExtended'
import EtaggerMixin from '@/mixins/EtaggerMixin'
import DocumentList from '@/common/projects/DocumentList'

export default {
  props: ['annualId', 'revcatId'],
  mixins: [EtaggerMixin("tasksEtag")],
  components: {
    ReviewsList,
    AnnualModalComplite,
    AnnualModalEdit,
    AnnualModalDelete,
    CommonDeleteModal,
    TaskFormModal,
    TaskTableExtended,
    DocumentList
  },
  data () {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        ["blockquote"],
        [{ list: "bullet" }],
        ["link"]
      ],
      errors: [],
      isDowloading: false,
    }
  },
  computed: {
    ...mapGetters({
      review: 'annual/currentReview'
    }),
    currentCategory () {
      return this.review.review_categories.find(item => item.id === this.revcatId)
    }
  },
  methods: {
    ...mapActions({
      updateReviewCategory: 'annual/updateReviewCategory',
      getCurrentReviewReview: 'annual/getCurrentReview'
    }),
    async saveCategory () {
      if (!this.currentCategory.name) {
          this.errors.push('Required field')
          return
      }
      this.errors = []
      const reviewCategory = this.currentCategory
      const data = {
        annualId: this.annualId,
        ...reviewCategory
      }
      
      try {
        await this.updateReviewCategory(data)
        this.toast('Success', "Category has been updated.")
        await this.getCurrentReviewReview(this.annualId)
        
      } catch (error) {
        this.toast('Error', error.message, true)
      }
    },
    async markComplete () {
      const reviewCategory = this.currentCategory
      const data = {
        annualId: this.annualId,
        ...reviewCategory,
        complete: !reviewCategory.complete,
      }
      try {
        await this.updateReviewCategory(data)
        const text = data.complete ? 'complete' : 'incomplete'
        this.toast('Success', `Category has been marked as ${text}.`)
        await this.getCurrentReviewReview(this.annualId)
      } catch (error) {
        this.toast('Error', error.message, true)
      }
    },
    addTopic() {
      const reviewCategory = this.currentCategory
      if (!reviewCategory.review_topics) {
        this.currentCategory.review_topics = [
          {
            items: [],
            name: ""
          }
        ]
        return
      }
      this.currentCategory.review_topics.push({
        items: [],
        name: ""
      })
    },
    addTopicItem(i) {
      this.currentCategory.review_topics[i].items.push({
        findings: [],
        body: "",
        checked: false
      })
    },
    addFindings(i, itemIndex) {
      this.currentCategory.review_topics[i].items[itemIndex].findings.push("")
    },
    removeFinding(topicIndex, itemIndex, findingIndex) {
      const finding = this.currentCategory.review_topics[topicIndex].items[itemIndex].findings[findingIndex]
      
      if (finding && finding.id) {
        finding['_destroy'] = true
        this.$set(this.currentCategory.review_topics[topicIndex].items[itemIndex].findings, findingIndex, finding)
      } else {
        this.currentCategory.review_topics[topicIndex].items[itemIndex].findings.splice(findingIndex, 1)
      }
    },
    deleteTopicItem(i, itemIndex) {
      this.currentCategory.review_topics[i].items.splice(itemIndex, 1);
    },
    deleteTopic(i) {
      this.currentCategory.review_topics.splice(i, 1);
    },
    deleteCategory(id) {
      this.$store.dispatch('annual/deleteReviewCategory', { annualId: this.review.id, id: id })
        .then(response => {
          this.toast('Success', `Internal review category has been deleted.`)
          //window.location.href = `${window.location.origin}/business/annual_reviews/${response.annual_report_id}`
          this.$router.push(`/business/annual_reviews/${response.annual_report_id}`)
        })
        .catch(error => this.toast('Error', `Internal review category has not been deleted. Please try again.`, true))
    },
    saveAndExit() {
      this.saveCategory()
      setTimeout(() => {
        this.$router.push(`/business/annual_reviews`)
      }, 3000)
    },
    deleteReview(reviewId){
      this.$store.dispatch('annual/deleteReview', { id: reviewId })
        .then(response => {
          this.toast('Success', `Internal review has been deleted., true`)
          //window.location.href = `${window.location.origin}/business/annual_reviews`
          this.$router.push(`/business/annual_reviews`)
        })
        .catch(error => this.toast('Error', `Internal review has not been deleted. Please try again.`, true))
    },
    backToList() {
      this.$router.push({ name: 'annual-reviews' })
    },
    download() {
      this.isDowloading = true;
      this.$store
        .dispatch("annual/downloadReviewPdf", { id: this.review.id })
        .then(() => {
          this.toast("Success", "Review has been queued for download.");
        });
    },
  },
  async mounted () {
    try {
      await this.getCurrentReviewReview(this.annualId)
    } catch (error) {
      this.toast('Error', error.message, true)
    }
  },
}
</script>
<style scoped>
.finding-area {
    width: calc(100% - 30px);
    float: left;
}

.editable-category-name {
  border: none;
  width: 100%;
}

@media only screen and (min-width: 1200px) {
  .new-item-text {
    padding-left: 30px !important;
  }
}

@media only screen and (min-width: 1700px) {
  .new-item-text {
    padding-left: 0 !important;
  }
}

@media only screen and (max-width: 767px) {
  .reviews__card--actions, .reviews__card--dropdown {
      margin-top: 10px;
  }
  .new-item-text textarea {
    margin-top: 10px;
  }
}
</style>
