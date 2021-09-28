<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="New Exam")
      .row
        .col-12.m-b-2
          label.form-label Exam Name
          input.form-control(v-model.trim="exam_management.name" type="text" ref="input" @keyup="onChange")
          Errors(:errors="errors.name")
      .row.m-t-1
        .col-6
          label.form-label Start Date
          DatePicker(v-model="exam_management.starts_on")
          Errors(:errors="errors.starts_on")
        .col-6
          label.form-label End Date
          DatePicker(v-model="exam_management.ends_on")
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
      validates() {
        const fields = ['name', 'starts_on', 'ends_on']
        fields.forEach(field => {
          const errors = []
          if (!this.exam_management[field]) {
            errors.push('Required field')
          }

          if (field === 'ends_on' && this.exam_management.starts_on && this.exam_management.ends_on) {
            if (this.exam_management.starts_on > this.exam_management.ends_on) errors.push('Date must occur after start date')
          }
          
          if (errors.length > 0) {
            this.$set(this.errors, field, errors)
          } else {
            if (this.errors[field]) delete this.errors[field]
          }
        })
      },
      async submit() {
        this.validates()
        if (Object.keys(this.errors).length > 0) {
          return
        }
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
