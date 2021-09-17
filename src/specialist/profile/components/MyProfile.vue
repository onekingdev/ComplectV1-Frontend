<template lang="pug">
  div
    Loading
    div(v-if='!loading && show')
      b-form-group#input-group-1
        h4.mb-3.semibold-text My Profile
        .row
          .col
            .d-flex
              .preview.preview_sm
                b-img(v-if="url" left :src="url" alt="Preview image")
              .d-block
                input.mb-2(type="file" hidden :state="Boolean(form.logo)" ref="inputFile" accept="image/*" @change="onFileChange" plain)
                b-button.button.btn.btn-secondary.m-r-1(@click="selectFile") Upload
                br
                a.d-block.mt-2.link(href='#' @click.prevent='onRemove') Remove
              .preview-switcher.availability
                | Availability
                b-form-checkbox.ml-2(v-model="form.visibility" switch size="lg")
        .row
          .col.pr-2
            b-form-group#input-group-1(label='First Name:' label-for='input-1' label-class="label")
              b-form-input#input-1(v-model='form.first_name' type='text' placeholder='First Name' min="3" required)
              .invalid-feedback.d-block(v-if="errors.first_name") {{ errors.first_name[0] }}
          .col.pl-2
            b-form-group#input-group-2(label='Last Name:' label-for='input-2' label-class="label")
              b-form-input#input-2(v-model='form.last_name' type='text' placeholder='Last Name' min="3" required)
              .invalid-feedback.d-block(v-if="errors.last_name") {{ errors.last_name[0] }}
        b-form-group#input-group-3(label='Description:' label-for='input-3' label-class="label")
          b-form-textarea(id="textarea"
            v-model="form.description"
            placeholder="Description"
            rows="3"
            max-rows="6")
          .invalid-feedback.d-block(v-if="errors.description") {{ errors.description[0] }}
        .row
          .col-xl-6
            b-form-group#inputS-group-1(label='Jurisdiction' label-for='selectS-1' label-class="label required")
              div(
              :class="{ 'invalid': errors.jurisdiction }"
              )
                multiselect#selectS-1(
                v-model="form.jurisdiction_ids"
                :options="staticCollection.jurisdictions"
                :multiple="true"
                :show-labels="false"
                track-by="name",
                label="name",
                placeholder="Select jurisdiction",
                required)
                .invalid-feedback.d-block(v-if="errors.jurisdiction") {{ errors.jurisdiction }}
          .col-xl-6
            b-form-group#inputS-group-4(label='Industry' label-for='selectS-4' label-class="label required")
              div(
              :class="{ 'invalid': errors.industry }"
              )
                multiselect#selectS-4(
                v-model="form.industry_ids"
                :options="staticCollection.industries"
                :multiple="true"
                :show-labels="false"
                track-by="name",
                label="name",
                placeholder="Select Industry",
                @input="onChangeIndustries",
                required)
                .invalid-feedback.d-block(v-if="errors.industry") {{ errors.industry }}
        .row
          .col-xl-6
            b-form-group(label='Sub-Industry'  label-for='selectS-6' label-class="label pb-0" description="Optional")
              div(
              :class="{ 'invalid': errors.expertise }"
              )
                multiselect#selectS-6(
                v-model="form.sub_industry_ids"
                :options="subIndustryOptions"
                :multiple="true"
                :show-labels="false"
                track-by="name",
                label="name",
                tag-placeholder="Expertise",
                placeholder="Select Sub-Industry",
                :taggable="true",
                @tag="addTag"
                required)
                .invalid-feedback.d-block(v-if="errors.regulator") {{ errors.regulator }}
          .col-xl-6
            b-form-group(label='Former Regulator' label-for='selectS-7' label-class="label pb-0" description="Optional")
              div(
              :class="{ 'invalid': errors.regulator }"
              )
                multiselect#selectS-7(
                v-model="form.regulatorOptionsTags"
                :options="specialistOtherOptions"
                :multiple="true"
                :show-labels="false"
                track-by="name",
                label="name",
                tag-placeholder="Add this as new tag",
                placeholder="Search or add a tag",
                :taggable="true",
                @tag="addTag"
                required)
                .invalid-feedback.d-block(v-if="errors.regulator") {{ errors.regulator }}
        b-form-group.text-right.mb-4
          button.btn.btn-default.mr-2(@click='onReset') Cancel
          b-button.btn(type='button' variant='dark' @click='onSubmit') Save
        hr
        .row
          .col
            .d-flex.justify-content-between.align-items-center.m-y-20
              h4.mb-0.semibold-text Skills
              ProfileAddEditSkills(:form="form" @updateSkill="editSkills")
                button.btn.btn-default Edit Skills
        .row
          .col.m-b-20
            b-badge.mr-2(variant="default" v-for="(skill, index) in form.skills" :key="index") {{ skill.name }}
        hr
        .row
          .col
            .d-flex.justify-content-between.align-items-center.m-y-20
              h4.mb-0.semibold-text Experience
        .row.mb-3(v-for="(item, index) in workExperiences" :key="index")
          .col
            .card
              .card-body
                .row
                  .col
                    h3.text-normal {{ item.job_title }}
                    p {{ item.company }} | {{ formatDateExperience(item) }}
                  .col
                    .d-flex.justify-content-end
                      CommonDeleteModal.ml-auto(title="Delete Experience" content="You are deleting a record of your work experience." @deleteConfirmed="deleteWorkExperience(item.id)", :inline="false")
                        b-button.btn.mr-2(type='button' variant='default') Delete
                      ProfileAddEditExperience(:workExperience="item" @compliteConfirmed="editExpirience")
                        b-button.btn(type='button' variant='dark') Edit
                .row
                  .col
                    p {{ item.description }}
        ProfileAddEditExperience(:form="form" @compliteConfirmed="addExpirience")
          button.btn.btn-default.mt-3
            b-icon.mr-2(icon='plus-circle-fill')
            | New Experience
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import Loading from '@/common/Loading/Loading'
  import ProfileAddEditSkills from "../modals/ProfileAddEditSkills";
  import ProfileAddEditExperience from "../modals/ProfileAddEditExperience";
  import CommonDeleteModal from '@/common/Modals/CommonDeleteModal'
  import { DateTime } from 'luxon'

  const initialForm = () => ({
    first_name: '',
    last_name: '',
    logo: null,
    description: '',
    jurisdiction_ids: [],
    industry_ids: [],
    sub_industry_ids: [],
    skills: [],
    experience: null,
    time_zone: '',
    industryOptions: [],
    regulatorOptionsTags: [],
    skillsTags: [],
    visibility: false
  })

  export default {
    name: "MyProfile",
    components: {
      ProfileAddEditExperience,
      CommonDeleteModal,
      ProfileAddEditSkills,
      Loading,
      Multiselect,
    },
    data() {
      return {
        form: initialForm(),
        show: true,
        errors: {},
        url: null,
        inputFile: null,
        specialistOtherOptions: [],
        subIndustryOptions: [],
        workExperiences: []
      }
    },
    created() {
      if (this.user) {
        this.form.first_name = this.user.first_name
        this.form.last_name  = this.user.last_name
        this.form.description = this.user.description
        this.form.industry_ids = this.user.industries || []
        this.onChangeIndustries(this.user.industries)
        this.form.jurisdiction_ids = this.user.jurisdictions || []
        if (this.user.visibility === 'is_public') {
          this.form.visibility = true
        }
        if (this.user.photo_url) {
          const isDevEnv = process.env.NODE_ENV === 'development'
          this.url = isDevEnv ? `${this.$store.getters.backendUrl}/${this.user.photo_url}` : this.user.photo_url
        }

        if (this.user.skills) {
          this.form.skills = this.user.skills
        }

        if(this.user.former_regulator && this.user.specialist_other) {
          const list = this.user.specialist_other.split(',')
          this.form.regulatorOptionsTags = list.map(item => {
            return {
              name: item,
              code: item.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
          })
        }
      }
    },
    mounted() {
      this.getWorkExperiences()
      this.$store.dispatch('getSkills')
        .then(response => this.form.skillsTags = response)
        .catch(error => console.error(error))
      this.$store.dispatch('getStaticCollection')
        .then(() => {
          this.onChangeIndustries(this.user.industries)

          const results = this.user.sub_industries
          if(results) {
            for (const [key, value] of Object.entries(this.staticCollection.sub_industries_specialist)) {
              for (const i of results) {
                if (i === value) {
                  this.form.sub_industry_ids.push({
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
      formatDateExperience(item) {
        if (item.start_date && item.end_date) {
          const formatStartDate = DateTime.fromISO(item.start_date).toFormat('MMMM yyyy')
          const formatEndDate = DateTime.fromISO(item.end_date).toFormat('MMMM yyyy')
          return `${formatStartDate} - ${formatEndDate}`
        }
      },
      async deleteWorkExperience(id) {
        const result = await this.$store.dispatch('deleteWorkExperience', { id: id })
        if (result) {
          const index = this.workExperiences.findIndex(item => item.id === id)
          if (index !== -1) {
            this.workExperiences.splice(index, 1)
          }
        }
      },
      async getWorkExperiences() {
        const res = await this.$store.dispatch('getWorkExperiences')
        if (res) this.workExperiences = res
      },
      async addExpirience (payload) {
        const result = await this.$store.dispatch('createWorkExperiences', { work_experience: payload })
        if (result) this.workExperiences.push(result)
      },
      async editExpirience(payload) {
        const result = await this.$store.dispatch('updateWorkExperiences', { id: payload.id, work_experience: payload })
        if (result) {
          const index = this.workExperiences.findIndex(item => item.id === result.id)
          if (index !== -1) {
            this.$set(this.workExperiences, index, result)
          }
        }
      },
      selectFile() {
        let fileInputElement = this.$refs.inputFile;
        fileInputElement.click();

        // Do something with chosen file
        this.form.logo = this.$refs.inputFile.files[0];
      },
      onFileChange(e) {
        // Show preview
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);

        this.form.logo = this.$refs.inputFile.files[0];
      },
      applyData(formData, field, data) {
        if (data.length) {
          data.forEach((item) => formData.append(field, item))
        } else {
          formData.append(field, data);
        }
      },
      validate() {
        this.errors = {}
        if (this.form.jurisdiction_ids.length < 1) {
          this.errors['jurisdiction'] = 'Required field'
        }

        if (this.form.industry_ids.length < 1) {
          this.errors['industry'] = 'Required field'
        }
      },
      onSubmit(event) {
        event.preventDefault()
        this.validate()
        if(Object.keys(this.errors).length > 0) return
        const params = {
          specialist: {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            jurisdiction_ids: this.form.jurisdiction_ids ? this.form.jurisdiction_ids.map(record => record.id) : [],
            industry_ids: this.form.industry_ids ? this.form.industry_ids.map(record => record.id) : [],
            sub_industry_ids: this.form.sub_industry_ids ? this.form.sub_industry_ids.map(record => record.value) : [],
            logo: this.form.logo,
            description: this.form.description
          }
        }

        let formData = new FormData()
        const specialist = params.specialist
        this.applyData(formData, 'specialist[jurisdiction_ids][]', specialist.jurisdiction_ids)
        formData.append('specialist[first_name]', specialist.first_name)
        formData.append('specialist[last_name]', specialist.last_name)
        formData.append('specialist[description]', specialist.description)
        this.applyData(formData, 'specialist[industry_ids][]', specialist.industry_ids)
        this.applyData(formData, 'specialist[sub_industry_ids][]', specialist.sub_industry_ids)

        if (!this.form.logo) {
          formData.append('specialist[photo]', null)
        } else {
          if(specialist.logo.lastModified) formData.append('specialist[photo]', specialist.logo)
        }
        
        if (this.form.visibility) {
          formData.append('specialist[visibility]', 'public')
        } else {
          formData.append('specialist[visibility]', 'private')
        }

        if (this.form.regulatorOptionsTags.length > 0) {
          formData.append('specialist[former_regulator]', true)
          formData.append('specialist[specialist_other]', this.form.regulatorOptionsTags.map(record => record.name).join(', '))
        } else {
          formData.append('specialist[specialist_other]', [])
          formData.append('specialist[former_regulator]', false)
        }

        formData.append('specialist[context]', 'update_profile')

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
      onRemove() {
        this.url = null,
        this.form.logo = null
      },
      onChangeIndustries (industries) {
        if(industries) {
          delete this.errors.industry_ids
          this.subIndustryOptions = []
          const results = industries.map(industry => industry.id)

          if(this.staticCollection.sub_industries_specialist) {
            for (const [key, value] of Object.entries(this.staticCollection.sub_industries_specialist)) {
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
      addTag (newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.form.regulatorOptionsTags.push(tag)
        this.specialistOtherOptions.push(tag)
      },
      editSkills (newSkills) {
        this.form.skills = newSkills
        let formData = new FormData()
        formData.append('specialist[context]', 'skills')
        const data = newSkills ? newSkills.map(skill => skill.name) : []
        this.applyData(formData, 'specialist[skill_names][]', data)

        this.$store.dispatch('updateAccountInfoWithFile', formData)
          .then(response => {
            if(response.errors) {
              this.toast('Error', 'Information has not been updated. Please try again.', true)
            }
            if(!response.errors) {
              this.toast('success', 'Information has been updated.')
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
      user() {
        return this.$store.getters.getUser
      },
      staticCollection() {
        return this.$store.getters.staticCollection;
      },
    },
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import url('../style.css');

.availability {
  margin-left: 100px;
}

/deep/ .custom-control-input:checked ~ .custom-control-label::before {
  top: 0.3125rem;
  height: 1.25rem;
  left: -2.8125rem;
  width: 2.1875rem;
  border-radius: 0.625rem;
}

/deep/ .custom-switch {
  position: relative;
  top: -8px;
}
</style>
