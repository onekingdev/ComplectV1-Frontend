<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    ModelLoader(:url="apiUrl" @loaded="load" :default="initialExam"): b-modal.fade(:id="modalId" title="Edit Exam")
      .row
        .col-12.m-b-2
          label.form-label Name
          input.form-control(v-model="exam_management.name" type="text" placeholder="Enter the name of your exam" ref="input" @keyup="onChange")
          Errors(:errors="errors.name")
      .row.m-t-1
        .col-6
          label.form-label Start Date
          DatePicker(v-model="exam_management.starts_on" :options="datepickerOptions")
          Errors(:errors="errors.starts_on")
        .col-6
          label.form-label Due Date
          DatePicker(v-model="exam_management.ends_on" :options="datepickerOptions")
          Errors(:errors="errors.ends_on")

      template(slot="modal-footer")
        button.btn.btn-link(@click="$bvModal.hide(modalId)") Cancel
        Post(method="PATCH" ref="SubmitButton" :action="apiUrl" :model="exam_management" @errors="errors = $event" @saved="saved")
          button.btn.btn-dark Save
</template>

<script>
  const rnd = () => Math.random().toFixed(10).toString().replace('.', '')

  const initialExam = () => ({
    id: null,
    name: null,
    starts_on: null,
    ends_on: null
  })

  export default {
    props: {
      inline: {
        type: Boolean,
        default: true
      },
      exam: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        modalId: `modal_${rnd()}`,
        exam_management: initialExam(),
        errors: {}
      }
    },
    methods: {
      initialExam,
      saved() {
        this.$emit('saved')
        this.toast('Success', `Exam has been saved.`)
        this.$bvModal.hide(this.modalId)
      },
      onChange(e){
        if (e.keyCode === 13) {
          // ENTER KEY CODE
          this.$refs.SubmitButton.$el.click()
        }
      },
      load(payload) {
        Object.assign(this.exam_management, payload)
      },
    },
    computed: {
      datepickerOptions() {
        return {
          min: new Date
        }
      },
      apiUrl() {
        return `/api/business/exams/${this.exam.id}`
      }
    },
  }
</script>
