<template lang="pug">
  .page.exam(v-if="currentExam")
    .page-header.bg-white
      div
        h3.page-header__breadcrumbs Regulatory Exams
        h2.page-header__title {{ currentExam ? currentExam.name : '' }}
      .page-header__actions
        ExamModalShare.mr-3(v-if="currentExam && plan !=='team' && !currentExam.complete" :examId="currentExam.id" :examAuditors="currentExam.exam_auditors" :examStatus="currentExam.complete")
          a.btn.btn-link Share Link
        ExamModalComplite.mr-3(v-if="currentExam && !currentExam.complete" @compliteConfirmed="markCompleteExam", :completedStatus="currentExam.complete", :countCompleted="countCompleted" :inline="false")
          button.btn.btn-default Mark as Complete
        .mr-3(v-else-if="currentExam")
          button.btn.btn-default(@click="markCompleteExam") Mark as Incomplete
        .mr-3(v-if="currentExam && !currentExam.complete")
          button.btn.btn-dark.mr-3(@click="saveAndExit") Save and Exit
        button.btn.btn__close(@click="exit")
          b-icon(icon="x")

    b-tabs.reviews__tabs.exams__tabs(content-class="mt-0")
      template(#tabs-end)
        b-dropdown.tab-actions.actions(v-if="currentExam && !currentExam.complete" variant="default", right)
          template(#button-content)
            | Actions
            b-icon.ml-2(icon="chevron-down" font-scale="1")
          ExamModalEdit(:exam="currentExam" :inline="false" @saved="refetchExam")
            b-dropdown-item Edit
          ExamModalDelete(@deleteConfirmed="deleteExam(currentExam.id)" :inline="false")
            b-dropdown-item.delete Delete
      b-tab(title="Detail" active)
        .container-fluid
          .row
            .col-md-9.mx-auto.position-relative
              Loading
              .card(v-if="currentExam")
                .white-card-header
                  .reviews__card--internal.d-flex.justify-content-between.align-items-center.pt-0.m-b-20.p-4
                    h3 Requests
                    router-link.btn.btn-default(:to="`/business/exam_management/${currentExam.id}/portal`" v-if="currentExam && !currentExam.complete && plan == 'business'") View Portal
                .white-card-body
                  .reviews__topiclist.px-4
                    .d-flex.justify-content-between.m-b-20
                      b-button-group(size="md")
                        b-button(type='button' :variant="filterOption === 'all' ? 'dark' : 'outline-dark'" @click="filterRequest('all')") All
                        b-button(type='button' :variant="filterOption === 'shared' ? 'dark' : 'outline-dark'" @click="filterRequest('shared')") Shared

                    input.input-file(type="file" id="files" ref="files" hidden multiple @change="selectFile")
                    template(v-if="currentExam.exam_requests" v-for="(currentRequst, i) in currentExamRequestsFiltered")
                      .reviews__card--internal.exams__card--internal(:key="`${currentExam.name}-${i}`" :class="{ 'completed': currentRequst.complete }")
                        .row.m-b-1.align-items-center
                          .col-md-1
                            .reviews__checkbox.d-flex.justify-content-between.m-t-0
                              .reviews__checkbox-item.reviews__checkbox-item--true.m-t-0(@click="markCompleteReqeust(currentRequst.id, currentRequst.complete)" :class="{ 'checked': currentRequst.complete, 'disabled': currentExam.complete }")
                                b-icon(icon="check2")
                          .col-md-11
                            .d-flex.justify-content-between.align-items-center
                              .d-flex.align-items-center
                                b-badge.mr-2(v-if="currentRequst.shared" variant="success") {{ currentRequst.shared ? 'Shared' : '' }}
                                .exams__input.exams__topic-name {{ currentRequst.name }}
                              .d-flex.actions.min-w-225(v-if="!currentExam.complete")
                                b-dropdown(size="xs" variant="default" class="m-0 p-0" right)
                                  template(#button-content)
                                    | Add Item
                                    b-icon.ml-2(icon="chevron-down")
                                  b-dropdown-item(@click="addTextEntry(i)") Text Entry
                                  b-dropdown-item(@click="uploadFile(currentRequst)") Upload Files
                                  ExamModalSelectFiles(:currentExamId="currentExam.id"  :request="currentRequst" :inline="false")
                                    b-dropdown-item Select Existing
                                TaskFormModal(:defaults="taskDefaults" @saved="refetchExam" :inline="false")
                                  button.btn.btn-primary.btn-dark.m-x-1 New Task
                                b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
                                  template(#button-content)
                                    b-icon(icon="three-dots")
                                  ExamRequestModalEdit(:examId="currentExam.id" :request="currentRequst" :inline="false")
                                    b-dropdown-item Edit
                                  b-dropdown-item(v-if="plan !=='team'" @click="shareRequestAction(currentRequst.id, !currentRequst.shared)") {{ currentRequst.shared ? 'Unshare' : 'Share' }}
                                  ExamRequestModalDelete(@deleteConfirmed="deleteExamRequest(currentRequst.id)" :inline="false")
                                    b-dropdown-item.delete Delete
                        .row.m-b-1.m-x-15
                          .col-md-11.offset-md-1
                            p.paragraph-16 {{ currentRequst.details }}
                        .row.m-b-1
                          .col-md-11.offset-md-1
                            .row
                              .col
                                .d-flex.justify-content-between.align-items-center
                                  span
                                    b-icon.mr-2(:icon="itemsTotal && itemsTotal.length ? 'chevron-down' : 'chevron-right'")
                                    | {{ itemsTotal[i] }} Items
                            hr(v-if="currentRequst.text_items")
                            .row(v-if="currentRequst.text_items")
                              template(v-for="(textItem, textIndex) in currentRequst.text_items")
                                .col-12.exams__text(:key="`${currentRequst.name}-${i}-${textItem}-${textIndex}`")
                                  textarea-autosize.exams__text-body(v-if="!currentExam.complete" v-model="currentRequst.text_items[textIndex].text")
                                  p(v-if="currentExam.complete") {{ currentRequst.text_items[textIndex].text }}
                                  button.btn.btn__close.float-right(v-if="!currentExam.complete" @click="removeTextEntry(i, textIndex)")
                                    b-icon(icon="x" font-scale="1")
                            .row
                              template(v-for="(file, fileIndex) in currentRequst.exam_request_files")
                                .col-md-6.m-b-1(:key="`${currentRequst.name}-${i}-${file}-${fileIndex}`")
                                  .file-card
                                    div.mr-2
                                      b-icon.file-card__icon(icon="file-earmark-text-fill" font-scale="2")
                                    div.ml-0.mr-auto
                                      p.file-card__name: b {{ file.name }}
                                      a.file-card__link.link(:href="file.file_url.split('?')[0]" target="_blank") Download
                                    div.ml-auto.align-self-start.actions(v-if="!currentExam.complete")
                                      b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
                                        template(#button-content)
                                          b-icon(icon="three-dots")
                                        b-dropdown-item.delete(@click="removeFile(currentRequst.id, file.id)") Delete
                  .d-flex.justify-content-between
                    ExamRequestModalCreate(v-if="!currentExam.complete" :examId="currentExam.id")
                      b-button.m-b-2.ml-4(variant='default')
                        b-icon.mr-2(icon='plus-circle-fill')
                        | New Request
                    div(v-else)
                    .white-card-body.pb-4.pr-4
                      .d-flex.justify-content-end
                        button.btn.btn-default.mr-2(v-if="!currentExam.complete" @click="saveExam") Save
                        ExamModalComplite(@compliteConfirmed="markCompleteExam", :completedStatus="currentExam.complete", :countCompleted="countCompleted" :inline="false")
                          button.btn(:class="currentExam.complete ? 'btn-default' : 'btn-dark'") Mark as {{ currentExam.complete ? 'Incomplete' : 'Complete' }}
      b-tab(title="Tasks" lazy)
        .container: .row.p-x-1: .col: .card
          TaskTableExtended(:tasks="currentExam.reminders" @saved="refetchExam" :task-defaults="taskDefaults")
      b-tab(title="Documents" lazy)
        .container
          .row.p-x-1
            .col
              .card-body.white-card-body.card-body_full-height.policy-details-card.p-0
                PageAttachments(:currentExam="currentExam")
      // b-tab(title="Activity" lazy)
      //   PageActivity
</template>

<script>
  import {mapGetters, mapActions} from "vuex"
  import Loading from '@/common/Loading/Loading'
  import ExamRequestModalCreate from "./modals/ExamRequestModalCreate";
  import ExamModalEdit from "./modals/ExamModalEdit";
  import ExamModalDelete from "./modals/ExamModalDelete";
  import ExamRequestModalDelete from "./modals/ExamRequestModalDelete";
  import ExamRequestModalEdit from "./modals/ExamRequestModalEdit";
  import TaskFormModal from "@/common/TaskFormModal";
  import ExamModalComplite from "./modals/ExamModalComplite";
  import ExamModalShare from "./modals/ExamModalShare";
  import ExamModalSelectFiles from "./modals/ExamModalSelectFiles";
  import TaskTableExtended from "@/common/TaskTableExtended";
  import PageAttachments from "./PageAttachments";
  import PageActivity from "./PageActivity";

  export default {
    props: ['examId'],
    components: {
      Loading,
      PageActivity,
      PageAttachments,
      TaskTableExtended,
      ExamModalSelectFiles,
      ExamModalShare,
      ExamModalComplite,
      TaskFormModal,
      ExamRequestModalEdit,
      ExamRequestModalCreate,
      ExamModalEdit,
      ExamModalDelete,
      ExamRequestModalDelete
    },
    data() {
      return {
        filterOption: 'all',
        shareRequestData: null,
        currentRequestUpload: null,
        files: []
      }
    },
    computed: {
      ...mapGetters({
        currentExam: 'exams/currentExam',
        plan: 'roles/currentPlan',
      }),
      loading() {
        return this.$store.getters.loading;
      },
      taskDefaults() {
        return { linkable_id: this.currentExam?.id, linkable_type: 'Exam' }
      },
      currentExamRequestsFiltered() {
        if (this.filterOption === 'shared') {
          return this.currentExam.exam_requests.filter(exam => exam.shared)
        } else {
          return this.currentExam.exam_requests
        }
      },
      countCompleted() {
        const totalLenght = this.currentExam.exam_requests.length
        const completedLenght = this.currentExam.exam_requests.filter(exam => exam.complete).length
        return `${completedLenght}/${totalLenght}`
      },
      itemsTotal() {

        const reqeustsItemsArr = this.currentExam.exam_requests.map(request => {
          const requestTextsCount = request.text_items ? request.text_items.length : 0
          const requestFilesCount = request.exam_request_files ? request.exam_request_files.length : 0
          const itemsTotal = requestTextsCount + requestFilesCount
          return itemsTotal ? itemsTotal : 0
        })
        return reqeustsItemsArr
      }
    },
    async mounted() {
      try {
        await this.getCurrentExam(this.examId)
      } catch (error) {
        this.toast('Error', error.message, true)
      }
    },
    methods: {
      refetchExam() {
        this.getCurrentExam(this.examId)
      },
      ...mapActions({
        updateExam: 'exams/updateExam',
        getCurrentExam: 'exams/getExamById',
        deletetCurrentExam: 'exams/deleteExam',
        updateCurrentExamRequest: 'exams/updateExamRequest',
        deleteCurrentExamRequest: 'exams/deleteExamRequest'
      }),
      async uploadFileForRequest() {
        try {
          // FOR MULTIPLE LOADING FILES
          let formData = new FormData()
          for( var i = 0; i < this.files.length; i++ ) {

          let file = this.files[i];
          formData.append('file', file);

          const data = {
            id: this.currentExam.id,
            request: { id: this.currentRequestUpload.id },
            formData
          }
          const sendFIle = new Promise((resolve, reject) => {
            this.$store.dispatch('exams/uploadExamRequestFile', data)
              .then(response => resolve(response))
              .catch(error => reject(error))
          });

          await sendFIle
            .then(response => this.toast('Success', `${response.name} successful uploaded!`))
            .catch(error => this.toast('Error', error.message, true))
          }
        } catch (error) {
          this.toast('Error', error.message, true)
        } finally {
          this.files = []
          this.currentRequestUpload = null
          this.$store.commit("setLoading", false, { root: true })
        }
      },
      uploadFile(currentRequst) {
        this.currentRequestUpload = currentRequst
        this.$refs.files.click()
      },
      selectFile(event){
        let uploadedFiles = this.$refs.files.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
        this.uploadFileForRequest()
      },
      filterRequest(field) {
        this.filterOption = field
      },
      async saveExam() {
        const exam = this.currentExam
        const examRequests = this.currentExam.exam_requests

        // PREPARE ENTRY TEXT FOR SENDING
        this.currentExam.exam_requests = this.currentExam.exam_requests
          .map(request => {
            return {
              ...request,
              text_items: request.text_items ? request.text_items.map(item => item.text) : []
            }
          })

        let data = {
          // examlId: this.examlId,
          // ...exam
          ...this.currentExam,
          exam_requests_attributes: this.currentExam.exam_requests
        }

        delete data.exam_requests;

        try {
          await this.updateExam(data)
            .then(response => {
              if (this.shareRequestData) {
                this.shareRequest()
              } else {
                this.toast('Success', "Exam has been saved.")
              }
            })
            .catch(error => this.toast('Error', error.message, true))
        } catch (error) {
          this.toast('Error', error.message, true)
        } finally {
          this.currentExam.exam_requests = examRequests
        }
      },
      async markCompleteExam(id, status) {
        const data = {
          id: this.currentExam.id,
          complete: !this.currentExam.complete,
        }
        try {
          await this.updateExam(data)
            .then(response => this.toast('Success', `Exam has been marked as ${!this.currentExam.complete ? 'in' : ''}complete.`))
            .catch(error => this.toast('Error', error.message, true))
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      },
      async markCompleteReqeust(id, complete) {
        const data = {
          id: this.currentExam.id,
          request: {
            id,
            complete: !complete,
          }
        }
        try {
          await this.updateCurrentExamRequest(data)
            .then(response => {
              const text = complete ? 'Request has been marked as incomplete.' : 'Request has been marked as complete.'
              this.toast('Success', text)
            })
            .catch(error => this.toast('Error', 'Request has not been marked as complete. Please try again.', true))
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      },
      async shareRequest() {
        if (!this.shareRequestData) return
        const data = {
          id: this.currentExam.id,
          request: {
            id: this.shareRequestData.id,
            shared: this.shareRequestData.status,
          }
        }

        try {
          await this.updateCurrentExamRequest(data)
            .then(response => {
              const text = this.shareRequestData.status ? 'Request has been shared.' : 'Request has been unshared.'
              this.toast('Success', text)
              this.shareRequestData = null
            })
            .catch(error => this.toast('Error', error.message, true))
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      },
      shareRequestAction(id, status) {
        this.shareRequestData = {
          id: id,
          status: status,
        }
        this.saveExam()
      },
      addTextEntry(i) {
        if (!this.currentExam.exam_requests[i].text_items) this.currentExam.exam_requests[i].text_items = []
        this.currentExam.exam_requests[i].text_items.push({
          text: ""
        })
      },
      removeTextEntry(i, itemIndex) {
        this.currentExam.exam_requests[i].text_items.splice(itemIndex, 1);
      },
      async deleteExamRequest(id) {
        try {
          await this.deleteCurrentExamRequest({id: this.examId, requestId: id})
            .then(response => this.toast('Success', `Request has been deleted.`))
            .catch(error => this.toast('Error', error.message, true))
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      },
      createTask(i) {
        console.log('createTask: ', i)
      },
      saveAndExit() {
        this.saveExam()
        window.location.href = `${window.location.origin}/business/exam_management/`
      },
      exit() {
        window.location.href = `${window.location.origin}/business/exam_management/`
      },
      async removeFile(requestId, fileID) {

        const data = {
          id: this.currentExam.id,
          request: {id: requestId},
          file: {id: fileID},
        }

        try {
          await this.$store.dispatch('exams/deleteExamRequestFile', data)
            .then(response => {
              this.toast('Success', `File has been deleted.`)
              this.$emit('saved')
              this.$bvModal.hide(this.modalId)
            })
            .catch(error => this.toast('Error', error.message, true))
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      },
      async deleteExam(id) {
        try {
          this.deletetCurrentExam({id: id})
            .then(response => {
              this.toast('Success', `Exam has been deleted.`)
              setTimeout(() => {
                window.location.href = `${window.location.origin}/business/exam_management/`
              }, 2000)
            })
            .catch(error => this.toast('Error', `Action has not been completed. Please try again. ${error.message}`, true))
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      },
    }
  }
</script>

<style scoped>
  @import "./styles.css";
  .reviews__checkbox {
    margin: 0;
  }
  .min-w-225 {
    min-width: 225px;
  }
</style>
