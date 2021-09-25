<template lang="pug">
  div
    .row
      .col
        .card.settings__card
          .card-title.px-3.px-xl-5.mb-0
            h3.mb-0 Security
          .card-body.white-card-body.px-3.px-xl-5
            .settings___card--internal.p-y-1
              .row
                .col-md-12
                  h4.semibold-text Change Email
              .row
                .col-md-8.col-lg-6
                  b-form-group#input-group-1.mt-3(label='Current Email' label-for='input-1' label-class="settings__card--label")
                    .d-flex
                      b-form-input#input-1(:value='user.user_email' type='email' placeholder='Email' disabled)
                  b-form(@submit='onSubmitEmail' v-if='show1')
                    b-form-group#input-group-1(label='New Email' label-for='input-1' label-class="settings__card--label required")
                      .d-flex
                        b-form-input#input-1(v-model.trim='form1.email' type='email' placeholder='Email' :class="{'is-invalid': errors.email }")
                        b-button.ml-2(type='submit' variant="dark") Save
                      Errors(:errors="errors.email")
                  b-form(@submit='onSubmitResetPassword' @reset="onResetPassword" v-if='show2')
                    b-form-group.p-t-1
                      h4.semibold-text Reset Password
                    b-form-group#input-group-2(label='Old Password' label-for='input-2'  label-class="settings__card--label required" )
                      b-form-input#input-2(v-model.trim='form2.current_password' type='password' placeholder='Old Password' :class="{'is-invalid': errors.current_password }")
                      Errors(:errors="errors.current_password")
                    b-form-group#input-group-3(label='New Password' label-for='input-3' description="Minimum 6 characters" label-class="settings__card--label required" )
                      b-form-input#input-3(v-model.trim='form2.password' type='password' placeholder='New Password' :class="{'is-invalid': errors.password }")
                      Errors(:errors="errors.password")
                    b-form-group#input-group-4(label='Confirm Password' label-for='input-4' label-class="settings__card--label required")
                      b-form-input#input-4(v-model.trim='form2.password_confirmation' type='password' placeholder='Confirm Password' :class="{'is-invalid': errors.password_confirmation }")
                      Errors(:errors="errors.password_confirmation")
                    b-form-group.d-flex.justify-content-end.m-t-20
                      b-button.btn.btn-link.mr-2(type='reset') Cancel
                      b-button.btn(type='submit' variant='dark') Save
            hr
            .settings___card--internal.p-y-1
              .row
                .col-md-12
                  h4.semibold-text Delete Account
              .row.mt-3
                .col-md-6
                  p By deleting your account, you will purge all information and saved&nbsp;
                    | documents associated with this account. This deletion cannot be reversed.&nbsp;
                    | Please take appropriate steps to save down to your own storage devices&nbsp;
                    | any records you need to access after the deletion of this account.
                  DeleteAccountModal(@deleteConfirmed="deleteAccount")
                    button.btn.btn-danger.font-weight-bold Delete
</template>

<script>
  import { mapActions } from 'vuex'
  import Loading from '@/common/Loading/Loading'
  import DeleteAccountModal from './modals/AccountModalDelete'

  const initialFormEmail = () => ({
    email: '',
  })

  const initialFormResetPassword = () => ({
    current_password: '',
    password: '',
    password_confirmation: '',
  })

  export default {
    components: {
      Loading,
      DeleteAccountModal
    },
    data() {
      return {
        show1: true,
        show2: true,
        form1: initialFormEmail(),
        form2: initialFormResetPassword(),
        errors: {},
        user: this.$store.getters.getUser
      };
    },
    methods: {
      ...mapActions({
        resetEmail: 'settings/resetEmailSettings',
        updatePassword: 'settings/updatePasswordSettings',
        deleteAccount: 'settings/deleteAccount',
        verifyChangeEmail: 'settings/verifyChangeEmail'
      }),
      async onSubmitEmail(event) {
        event.preventDefault()
        this.errors = {}
        if (!this.form1.email) {
          this.errors['email'] = ['Required field']
          return
        }
        const data = {
          "user": {
            email: this.form1.email
          }
        }

        try {
          const response = await this.verifyChangeEmail(data)
          if (response) {
            if (response.errors) {
              for (const [key, value] of Object.entries(response.errors)) {
                this.errors = Object.assign(this.errors, { [key]: value })
              }
              if (response.errors.not_found) this.errors = Object.assign(this.errors, { email: [response.errors.not_found] })
            }
            if (!response.errors) {
              const form = {
                email: response.email,
                isUpdateLoginEmail: true,
                newEmail: this.form1.email
              }
              this.$router.push({ name: 'verification', params: { form: form } })
            }
            if (!response) console.error(response)

            this.show1 = false
            this.$nextTick(() => {
              this.show1 = true
            })

          }
        } catch (erroe) {
          console.error(error)
        }
      },
      async onSubmitResetPassword(event) {
        event.preventDefault()
        this.errors = {}
        const requiredFields = ['current_password', 'password', 'password_confirmation']
        for(let i = 0; i < requiredFields.length; i++) {
          const field = requiredFields[i]
          if (!this.form2[field]) this.$set(this.errors, field, ['Required field'])
        }

        if (this.form2.password.length < 6) this.$set(this.errors, 'password', ['New password is too short (minimum is 6 characters)'])

        if (this.form2.password !== this.form2.password_confirmation) this.$set(this.errors, 'password_confirmation', ['Confirm password does not match '])

        if (Object.keys(this.errors).length > 0) return

        const data = {
          "user": {
            ...this.form2
          },
        }

        try {
          const response = await this.updatePassword(data)
          if (response) {
            if (response.errors) {
              for (const [key, value] of Object.entries(response.errors)) {
                this.errors = Object.assign(this.errors, { [key]: value })
                this.toast('Error', 'Password has not been updated. Please try again.', true)
              }
            }
            if (!response.errors) {
              this.toast('Success', 'Password has been updated.')
              this.form2 = initialFormResetPassword()
            }
          }
          if (!response) console.error(response)

          this.show2 = false
          this.$nextTick(() => {
            this.show2 = true
          })

        } catch (error) {
          console.error(error)
        }
      },
      onResetPassword(event) {
        event.preventDefault()
        // Reset our form values
        this.form2 = initialFormResetPassword()
        // Trick to reset/clear native browser form validation state
        this.show2 = false
        this.$nextTick(() => {
          this.show2 = true
        })
      },
      async deleteAccount () {
        try {
          const response = await this.deleteAccount
          if (response) {
            if (response.errors) {
              for (const type of Object.keys(response.errors)) {
                this.errors = response.errors[type]
                this.toast('Error', `${response.errors[type]}`, true)
              }
            }
            if (!response.errors) {
              this.toast('Success', `${response.message}`)
            }
          }
          if (!response) console.error(response)
        } catch (error) {
          console.error(error)
        }
      }
    },
  };
</script>
