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
                input(ref="inputFile" type="file" accept="image/*" plain hidden @change="onFileChange")
                b-button.m-r-1(variant="secondary" @click="selectFile") Upload
                a.d-block.link.mt-2(href='#' @click.prevent='onRemove') Remove
        .row
          .col.pr-2
            b-form-group#input-group-1(label='First Name:' label-for='input-1' label-class="label")
              b-form-input#input-1(v-model='form.first_name' type='text' placeholder='First Name' min="3" required)
              .invalid-feedback.d-block(v-if="errors.first_name") {{ errors.first_name[0] }}
          .col.pl-2
            b-form-group#input-group-2(label='Last Name:' label-for='input-2' label-class="label")
              b-form-input#input-2(v-model='form.last_name' type='text' placeholder='Last Name' min="3" required)
              .invalid-feedback.d-block(v-if="errors.last_name") {{ errors.last_name[0] }}
      b-form-group.text-right
        b-button.btn.btn-link.mr-2(@click='onReset') Cancel
        b-button.btn(@click='onSubmit' variant='dark') Save
</template>

<script>
  import Loading from '@/common/Loading/Loading'

  const initialForm = () => ({
    first_name: '',
    last_name: '',
    logo: null,
  })

  export default {
    name: "MyProfile",
    components: {
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
      if (this.$store.getters.getUser) {
        const user = this.$store.getters.getUser
        this.form.first_name = user.contact_first_name
        this.form.last_name = user.contact_last_name
        if (user.photo) {
          this.form.logo = user.photo
          this.url = process.env.NODE_ENV === 'development' ? `${this.$store.getters.backendUrl}/${user.photo}` : user.photo
        }
      }
    },
    methods: {
      selectFile() {
        let fileInputElement = this.$refs.inputFile
        fileInputElement.click()
        this.form.logo = this.$refs.inputFile.files[0]
      },
      onFileChange(e) {
        const file = e.target.files[0]
        this.url = URL.createObjectURL(file)
        this.form.logo = this.$refs.inputFile.files[0]
      },
      onSubmit(event) {
        event.preventDefault()
        let dataToSend = new FormData()
        dataToSend.append('business[contact_first_name]', this.form.first_name)
        dataToSend.append('business[contact_last_name]', this.form.last_name)
        dataToSend.append('business[photo]', this.form.logo)

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
        this.form.logo = null
      },
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
    },
  }
</script>

