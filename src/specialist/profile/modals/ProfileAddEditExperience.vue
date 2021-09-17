<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="New Experience")
      .row
        .col-12.m-b-20
          label.form-label Title
          input.form-control(v-model="form.job_title" type="text" placeholder="Title/Role at company" ref="input" @keyup="onChange")
          .invalid-feedback.d-block(v-if="errors.job_title") {{ errors.job_title[0] }}
      .row
        .col-12.m-b-20
          label.form-label Employer
          input.form-control(v-model="form.company" type="text" placeholder="Company Name" ref="input" @keyup="onChange")
          .invalid-feedback.d-block(v-if="errors.company") {{ errors.company[0] }}
      .row.m-b-20
        .col-6
          label.form-label Start Date
          b-form-datepicker(v-model="form.start_date" :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" locale="en-US")
          .invalid-feedback.d-block(v-if="errors.start_date") {{ errors.start_date[0] }}
        .col-6
          label.form-label End Date
          b-form-datepicker(v-model="form.end_date" :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" locale="en-US")
          .invalid-feedback.d-block(v-if="errors.end_date") {{ errors.end_date[0] }}
      .row.m-b-20
        .col
          label.form-label Description
          b-form-textarea(id="textareaDescription"
          v-model="form.description"
          placeholder="Describe your role"
          rows="3"
          max-rows="6")
          .form-text.text-muted Max 1000 words
          .invalid-feedback.d-block(v-if="errors.description") {{ errors.description[0] }}

      Errors(:errors="errors.title")

      template(slot="modal-footer")
        button.btn.link(@click="$bvModal.hide(modalId)") Cancel
        button.btn.btn-dark(@click="submit") {{ this.form.id ? 'Save' : 'Add' }}
</template>

<script>
  const rnd = () => Math.random().toFixed(10).toString().replace('.', '')
  export default {
    props: {
      inline: {
        type: Boolean,
        default: true
      },
      workExperience: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        modalId: `modal_${rnd()}`,
        errors: {},
        form: {
          job_title: '',
          company: '',
          start_date: '',
          end_date: '',
          description: '',
        }
      }
    },
    methods: {
      onChange(e){
        if (e.keyCode === 13) {
          // ENTER KEY CODE
          this.submit(e)
        }
      },
      validate() {
        this.errors = {}
        const requiredFields = ['job_title', 'company', 'start_date', 'end_date']
        for(let i = 0; i < requiredFields.length; i++) {
          const field = requiredFields[i]
          if (!this.form[field]) this.$set(this.errors, field, ['Required field'])
        }
       
        if (this.form.start_date && this.form.end_date) {
          if (this.form.start_date > this.form.end_date) {
            this.$set(this.errors, 'end_date', ['Date must occur after start date'])
          }
        }
      },
      submit(e) {
        e.preventDefault();
        this.validate()
        if (Object.keys(this.errors).length > 0) return 
        this.$emit('compliteConfirmed', this.form)
        this.$bvModal.hide(this.modalId)
      },
    },
    created() {
      if (this.workExperience) {
        this.form = {...this.workExperience}
      }
    },
  }
</script>
