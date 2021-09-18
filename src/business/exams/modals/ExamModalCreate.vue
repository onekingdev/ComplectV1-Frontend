<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="New Exam")
      .row
        .col-12.m-b-2
          label.form-label Name
          input.form-control(v-model.trim="exam_management.name" type="text" ref="input" @keyup="onChange")
          Errors(:errors="errors.name")
      .row.m-b-2
        .col-6
          label.form-label Start Date
          b-form-datepicker(v-model="exam_management.starts_on" :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" locale="en")
          Errors(:errors="errors.starts_on")
        .col-6
          label.form-label End Date
          b-form-datepicker(v-model="exam_management.ends_on" :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" locale="en")
          Errors(:errors="errors.ends_on")

      template(slot="modal-footer")
        button.btn.btn-link(@click="$bvModal.hide(modalId)") Cancel
        button.btn.btn-dark(@click.prevent="submit") Create
</template>

<script>
  const rnd = () => Math.random().toFixed(10).toString().replace('.', '')

  export default {
    props: {
      inline: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        modalId: `modal_${rnd()}`,
        exam_management: {
          name: null,
          starts_on: null,
          ends_on: null
        },
        errors: {}
      }
    },
    methods: {
      resetForm() {
        this.exam_management = {
          name: null,
          starts_on: null,
          ends_on: null
        }
        this.errors = {}
      },
      onChange(e){
        if (e.keyCode === 13) {
          // ENTER KEY CODE
          this.submit()
        }
      },
      async submit() {
        try {
          const result = await this.$store.dispatch('exams/createExam', this.exam_management)
          if (result.status === 422) {
            this.errors = result.data
          } else if (result.status === 201) {
            this.toast('Success', `Exam has been created.`)
            this.$store.dispatch('exams/getExams')
            this.$bvModal.hide(this.modalId)
            this.resetForm()
          }
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      }
    }
  }
</script>
