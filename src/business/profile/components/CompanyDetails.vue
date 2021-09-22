<template lang="pug">
  div
    Loading
    b-form(@submit='onSubmit' @reset='onReset' v-if='!loading && show')
      b-form-group#input-group-1
        h4.mb-3.semibold-text Company Details
        .row
          .col
            .d-flex
              .preview.preview_sm
                b-img(v-if="url" left :src="url" alt="Preview image")
              .d-block
                input.mb-2(ref="inputFile" type="file" accept="image/*" plain hidden @change="onFileChange")
                .business-profile-preview-image-controls
                  b-button.m-r-1(variant="secondary" @click="selectFile") Upload
                  b-button.btn.btn-link.m-r-1.m-t-05(@click.prevent='onRemove') Remove
        .row
          .col-sm-6.pr-sm-2
            b-form-group#inputB-group-1(label='Company Name' label-for='inputB-1' label-class="label required")
              b-form-input#inputB-1(v-model='form.business.business_name' type='text' placeholder='Company Name' required :class="{'is-invalid': errors.business_name }")
              .invalid-feedback.d-block(v-if="errors.address_1") {{ errors.address_1[0] }}
          .col-sm-6.pl-sm-2
            b-form-group(label='CRD number' label-class="label")
              b-form-input(v-model="form.business.crd_number" type='text' placeholder="Enter your CRD number" :class="{'is-invalid': errors.crd_number }")
              .invalid-feedback.d-block(v-if="errors.crd_number") {{ errors.crd_number }}
        .row
          .col-sm.pr-sm-2
            b-form-group#inputB-group-2(label='AUM' label-for='inputB-2' label-class="label")
              b-form-input#inputB-2(v-model='form.business.aum' type='text' placeholder='AUM' :class="{'is-invalid': errors.aum }")
              .invalid-feedback.d-block(v-if="errors.aum") {{ errors.aum[0] }}
          .col-sm.pl-sm-2
            b-form-group#inputB-group-3(label='Number of Accounts' label-for='label inputB-3' label-class="label")
              b-form-input#inputB-3(v-model='form.business.client_account_cnt' type='text' placeholder='Number of Accounts' :class="{'is-invalid': errors.client_account_cnt }")
              .invalid-feedback.d-block(v-if="errors.client_account_cnt") {{ errors.client_account_cnt[0] }}
        .row
          .col-sm-6.pr-sm-2
            b-form-group#inputB-group-4(label='Industry' label-for='selectB-4' label-class="label required")
              div(
              :class="{ 'invalid': errors.industries }"
              )
                multiselect#selectB-4(
                v-model="form.business.industries"
                :options="staticCollection.industries"
                :multiple="true"
                :show-labels="false"
                track-by="name",
                label="name",
                placeholder="Select Industry",
                @input="onChangeIndustries",
                required)
                .invalid-feedback.d-block(v-if="errors.industries") {{ errors.industries[0] }}
                // label.typo__label.form__label(v-if="errors.industries") {{ errors.industries[0] }}
          .col-sm-6.pl-sm-2
            b-form-group#inputB-group-5(label='Sub-Industry' label-for='selectB-5' label-class="label")
              div(
              :class="{ 'invalid': errors.subIndustry }"
              )
                multiselect#selectB-5(
                v-model="form.business.sub_industries"
                :options="subIndustryOptions"
                :multiple="true"
                :show-labels="false"
                track-by="name",
                label="name",
                placeholder="Select Sub-Industry",
                required)
                .invalid-feedback.d-block(v-if="errors.subIndustry") {{ errors.subIndustry[0] }}
        .row
          .col-sm-6.pr-sm-2
            b-form-group#inputB-group-6(label='Jurisdiction' label-for='selectB-6' label-class="label required")
              div(
              :class="{ 'invalid': errors.jurisdictions }"
              )
                multiselect#selectB-6(
                v-model="form.business.jurisdictions"
                :options="staticCollection.jurisdictions"
                :multiple="true"
                :show-labels="false"
                track-by="name",
                label="name",
                placeholder="Select Jurisdiction",
                required)
                .invalid-feedback.d-block(v-if="errors.jurisdictions") {{ errors.jurisdictions[0] }}
          .col-sm-6.pl-sm-2
            b-form-group#inputB-group-7(label='Time Zone' label-for='selectB-7' label-class="label required")
              div(
              :class="{ 'invalid': errors.time_zone }"
              )
                multiselect#selectB-7(
                v-model="form.business.time_zone"
                :options="staticCollection.timezones"
                :multiple="false"
                :show-labels="false"
                track-by="name",
                label="name"
                placeholder="Select Time Zone",
                required)
                .invalid-feedback.d-block(v-if="errors.time_zone") {{ errors.time_zone[0] }}
        .row
          .col-sm-6.pr-sm-2
            b-form-group#inputB-group-8(label='Phone Number' label-for='inputB-8' label-class="label" description="Optional")
              b-form-input#inputB-8(v-model='form.business.contact_phone' type='text' placeholder='Phone Number' :class="{'is-invalid': errors.contact_phone }")
              .invalid-feedback.d-block(v-if="errors.contact_phone") {{ errors.contact_phone[0] }}
          .col-sm-6.pl-sm-2
            b-form-group#inputB-group-7(label='Company Website' label-for='inputB-7' label-class="label" description="Optional")
              b-form-input#inputB-7.form-control(v-model='form.business.website' type='text' placeholder='Company Website' :class="{'is-invalid': errors.website }")
              .invalid-feedback.d-block(v-if="errors.website") {{ errors.website[0] }}
        hr
        .row
          .col-xl-9.pr-xl-2
            b-form-group#inputB-group-9(label='Business Address' label-for='inputB-9' label-class="label required")
              vue-google-autocomplete#map(ref="address" classname='form-control' :class="{'is-invalid': errors.address_1 }" v-model='form.business.address_1' placeholder='Business Address'  :fields="['address_components', 'adr_address', 'geometry', 'formatted_address', 'name']" v-on:placechanged='getAddressData')
              .invalid-feedback.d-block(v-if="errors.address_1") {{ errors.address_1[0] }}
          .col-xl-3.pl-xl-2
            b-form-group#inputB-group-10(label='Apt/Unit:' label-for='inputB-10' label-class="label")
              b-form-input#inputB-10(v-model='form.business.apartment' type='text' placeholder='Apt/Unit' :class="{'is-invalid': errors.apartment }")
              .invalid-feedback.d-block(v-if="errors.apartment") {{ errors.apartment[0] }}
        .row
          .col-xl-4.pr-xl-2
            b-form-group#inputB-group-12(label='City' label-for='inputB-12' label-class="label required")
              b-form-input#inputB-12(v-model='form.business.city' type='text' placeholder='City' required :class="{'is-invalid': errors.city }")
              .invalid-feedback.d-block(v-if="errors.city") {{ errors.city[0] }}
          .col-xl-4.px-xl-2
            b-form-group#inputB-group-13(label='State' label-for='selectB-13' label-class="label required")
              div(
              :class="{ 'invalid': errors.state }"
              )
                multiselect#selectB-13(
                v-model="form.business.state"
                :options="staticCollection.states"
                :show-labels="false"
                placeholder="Select state",
                @input="onChangeState",
                required)
                .invalid-feedback.d-block(v-if="errors.state") {{ errors.state[0] }}
          .col-xl-4.pl-xl-2.mb-3
            b-form-group#inputB-group-11(label='Zip' label-for='inputB-11' label-class="label required")
              b-form-input#inputB-11(v-model='form.business.zipcode' placeholder='Zip' required :class="{'is-invalid': errors.zipcode }")
              .invalid-feedback.d-block(v-if="errors.zipcode") {{ errors.zipcode[0] }}
        b-form-group.text-right.mb-0
          b-button.btn.btn-link.mr-2(type='reset') Cancel
          b-button.btn(type='submit' variant='dark') Save
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import Multiselect from 'vue-multiselect'
  import Loading from '@/common/Loading/Loading'

  const initialForm = () => ({
    business: {
      logo: null,
      crd_number: '',
      contact_phone: '',
      business_name: '',
      website: '',
      aum: '',
      apartment: '',
      client_account_cnt: '',
      address_1: '',
      city: '',
      state: '',
      zipcode: '',
      industries: [],
      sub_industries: [],
      jurisdictions: [],
      time_zone: [],
    }
  })

  const DATA_FIELDS = [
    'business_name',
    'crd_number',
    'aum',
    'contact_phone',
    'apartment',
    'client_account_cnt',
    'city',
    'state',
    'zipcode',
    'address_1',
    'website',
    'logo'
  ]

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
        subIndustryOptions: [],
        show: true,
        errors: {},
        url: null,
      }
    },
    created() {
      if (this.user) {
        const user = this.user
        this.form.business = Object.assign({}, this.form.business, { ...user })
        this.form.business.sub_industries = []
        this.onChangeIndustries(this.user.industries)
        if (user.logo) {
          this.url = process.env.NODE_ENV === 'development' ? `${this.$store.getters.backendUrl}/${user.logo}` : user.logo
        }
        this.form.business.time_zone = {
          name: user.time_zone,
          value: user.time_zone
        }
      }
    },
    mounted() {
      this.$store.dispatch('getStaticCollection')
        .then(response => {
          this.onChangeIndustries(this.user.industries)

          const results = this.user.sub_industries
          if(results) {
            for (const [key, value] of Object.entries(this.staticCollection.sub_industries_business)) {
              for (const i of results) {
                if (i === value) {
                  this.form.business.sub_industries.push({
                    name: value,
                    value: key
                  })
                }
              }
            }
          }
        })
        .catch(error => console.error(error))
    },
    methods: {
      selectFile() {
        let fileInputElement = this.$refs.inputFile
        fileInputElement.click()
        this.form.business.logo = this.$refs.inputFile.files[0]
      },
      onChangeIndustries (industries) {
        if(industries) {
          delete this.errors.industries
          this.subIndustryOptions = []
          const results = industries.map(industry => industry.id)

          if(this.staticCollection.sub_industries_business) {
            for (const [key, value] of Object.entries(this.staticCollection.sub_industries_business)) {
              for (const i of results) {
                if (i === +key.split('_')[0]) {
                  this.subIndustryOptions.push({
                    value: key,
                    name: value
                  })
                }
              }
            }
          }
        }
      },
      onFileChange(e) {
        // Show preview
        const file = e.target.files[0]
        this.url = URL.createObjectURL(file)

        this.form.business.logo = this.$refs.inputFile.files[0]
      },
      validate() {
        this.errors = {}
        const stringField = ['address_1', 'zipcode', 'city', 'state', 'time_zone']
        const arrayField = ['industries', 'jurisdictions']
        for(let i = 0 ;i < stringField.length; i++) {
          if(!this.form.business[stringField[i]]) this.$set(this.errors, stringField[i], ['Required field'])
        }

        for(let i = 0; i < arrayField.length; i++) {
          if(this.form.business[arrayField[i]].length < 1) this.$set(this.errors, arrayField[i], ['Required field'])
        }
      },
      applyData(formData, field, data) {
        if (data.length) {
          data.forEach((item) => formData.append(field, item))
        } else {
          formData.append(field, data)
        }
      },
      prepareData() {
        let dataToSend = new FormData()
        const business = this.form.business
        DATA_FIELDS.forEach(field => {
          dataToSend.append(`business[${field}]`, business[field])
        })
        dataToSend.append('business[time_zone]', business.time_zone.value)
        this.applyData(dataToSend, 'business[industry_ids][]', business.industries.map(record => record.id))
        this.applyData(dataToSend, 'business[sub_industry_ids][]', business.sub_industries.map(record => record.value))
        this.applyData(dataToSend, 'business[jurisdiction_ids][]', business.jurisdictions.map(record => record.id))
        return dataToSend
      },
      onSubmit(event) {
        event.preventDefault()
        this.validate()
        if (Object.keys(this.errors).length > 0) return
        const dataToSend = this.prepareData()
        const payload = { business: dataToSend }
        this.$store.dispatch('updateAccountInfoWithFile', payload)
          .then(response => {
            if (response.errors) {
              this.toast('Error', 'Information has not been updated. Please try again.', true)
            } else {
              this.toast('Success', 'Information has been updated.')
            }
          }).catch(error => console.error(error) )
      },
      onReset(event) {
        event.preventDefault()
        this.form = initialForm()
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      onRemove() {
        this.url = null,
        this.form.business.logo = null
      },
      onChangeState(){
        delete this.errors.state
      },
      onAdressChange() {
        const address = this.form.business.address_1
        this.$store.dispatch('getGeo', address)
          .then(response => console.info(response))
          .catch(error => console.error(error))
      },
      getAddressData (addressData, placeResultData, id) {
        const input = document.getElementById(id)
        const { administrative_area_level_1, locality, postal_code } = addressData

        this.form.business.address_1 = input.value
        this.form.business.city = locality
        this.form.business.state = administrative_area_level_1
        this.form.business.zipcode = postal_code
      },
      onChange (industries) {
        if(industries) {
          delete this.errors.industries
          this.subIndustryOptions = []
          const results = industries.map(industry => industry.id)

          if(this.subIndustryIds) {
            for (const [key, value] of Object.entries(this.subIndustryIds)) {
              for (const i of results) {
                if (i === +key.split('_')[0]) {
                  this.subIndustryOptions.push({
                    value: key,
                    name: value
                  })
                }
              }
            }
          }
        }
      },
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      },
      staticCollection() {
        return this.$store.getters.staticCollection
      },
      loading() {
        return this.$store.getters.loading
      },
    },
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
