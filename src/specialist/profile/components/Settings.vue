<template lang="pug">
  div
    Loading
    div(v-if='!loading && show')
      .row
        .col
          h3.mb-3.semibold-text My Rate
          b-form-group#inputS-group-1.m-b-20(label='Hourly Rate' label-for='inputS-1' label-class="label required" description="Per hour")
            b-form-input#inputS-1(v-model='form.hourly_rate' type='number' placeholder='Hourly Rate' required :class="{'is-invalid': errors.business_name }")
            .invalid-feedback.d-block(v-if="errors.hourly_rate") {{ errors.hourly_rate[0] }}
      hr.mgt-5
      .row
        .col
          h3.onboarding__title.m-b-20.semibold-text Experience Level
          b-form-group(class="onboarding-group m-b-30")
            b-button.exp__btn(variant="default" :class="form.experience === 0 ? 'active' : ''" type='button' data-toggle="button" aria-pressed="false" autocomplete="off" @click="onexperienceChange(0)")
              span.exp__btn--main Junior
              span.exp__btn--sub Beginner consultant with some industry experience.
            b-button.exp__btn(variant="default" :class="form.experience === 1 ? 'active' : ''" type='button' data-toggle="button" aria-pressed="false" autocomplete="off" @click="onexperienceChange(1)")
              span.exp__btn--main Intermediate
              span.exp__btn--sub Good experience and solid knowledge of the industry.
            b-button.exp__btn(variant="default" :class="form.experience === 2 ? 'active' : ''" type='button' data-toggle="button" aria-pressed="false" autocomplete="off" @click="onexperienceChange(2)")
              span.exp__btn--main Expert
              span.exp__btn--sub Deep understanding of industry with varied experience.
      hr.mgt-5
      .row
        .col
          h3.m-b-20.semibold-text Name Settings
          b-form-group(v-slot='{ ariaDescribedby }')
            b-form-radio-group(v-model='form.nameSettingsSelected' :options='form.nameSettingsOptions' :aria-describedby='ariaDescribedby' name='radios-stacked' stacked)
      hr
      b-form-group.text-right.pt-3
        b-button.btn(type='button' variant='dark' @click='onSubmit') Save
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import Multiselect from 'vue-multiselect'
  import Loading from '@/common/Loading/Loading'

  const initialForm = () => ({
    hourly_rate: '',
    experience: '',
    nameSettingsSelected: '',
    nameSettingsOptions: [
      'Show my full name (ex. John Doe)',
      'Show my first name and first letter of my last (ex. John D.)'
    ],
  })

  export default {
    name: "CompanyDetails",
    components: {
      VueGoogleAutocomplete,
      Multiselect,
      Loading,
    },
    data() {
      return {
        form: initialForm(),
        show: true,
        errors: {},
        url: null,
        inputFile: null
      }
    },
    created() {
      const accountInfo = localStorage.getItem('app.currentUser')
      const accountInfoParsed = JSON.parse(accountInfo)
      if (accountInfoParsed) {
        this.form.experience = accountInfoParsed.experience
        this.form.hourly_rate = accountInfoParsed.min_hourly_rate
        if (accountInfoParsed.name_setting) {
          const setting = accountInfoParsed.name_setting
          if (setting === 'full_name') this.form.nameSettingsSelected = this.form.nameSettingsOptions[0]
          if (setting === 'first_name_first_letter') this.form.nameSettingsSelected = this.form.nameSettingsOptions[1]
        }
      }
    },
    methods: {
      onexperienceChange(value) {
        this.form.experience = value
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form = initialForm();
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      onSubmit(event) {
        console.log(this.form)
        let formData = new FormData()
        formData.append('specialist[min_hourly_rate]', this.form.hourly_rate)
        formData.append('specialist[experience]', this.form.experience)
        formData.append('specialist[context]', 'setting')
        if (this.form.nameSettingsSelected === this.form.nameSettingsOptions[0]) formData.append('specialist[name_setting]', 'full_name')
        if (this.form.nameSettingsSelected === this.form.nameSettingsOptions[1]) formData.append('specialist[name_setting]', 'first_name_first_letter')
        this.$store.dispatch('updateAccountInfoWithFile', formData)
          .then(response => {
            if(response.errors) {
              this.toast('Error', 'Information has not been updated. Please try again.', true)
            }
            if(!response.errors) {
              this.toast('Success', 'Information has been updated.')
            }
          })
          .catch(error => {
            this.toast('Error', `${error.status} ${error.statusText}`, true)
          })
      },
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
    },
  }
</script>

<style scoped>
@import url('../style.css');
.mgt-5 {
  margin-top: 0 !important;
}
</style>
