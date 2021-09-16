<template lang="pug">
  .card.registration
    .card-body.white-card-body
      .form
        .registration-welcome
          h1.registration__title Let's get you started!

        div
          b-alert.m-b-20(v-if="error" variant="danger" show) {{ error }}

          b-form(@submit='onSubmit' v-if='show')
            b-form-group#input-group-1.m-b-20(label="Email:" label-for="email")
              b-form-input#email(
                type="text"
                placeholder="Email"
                v-model="form.email"
                @input="onChangeInput('email')"
                :class="{'is-invalid': errors.email}"
              )
              Errors(:errors="errors.email")

            b-form-group#input-group-2.m-b-20(label="Password:" label-for="password")
              b-form-input#password(
                type="password"
                placeholder="Password"
                v-model="form.password"
                @input="onChangeInput('password')"
                :class="{'is-invalid': errors.password}"
              )
              Errors(:errors="errors.password")

            b-button.m-b-20.w-100(type="submit" variant="dark") Sign In
            b-form-group.text-center.forgot-password.mb-0
              router-link.link.o-8.forgot-password(to="/users/password/new") Forgot Password

    .card-footer
      b-form-group.text-center.mb-0
        p.mb-0 Don't have an account yet?&nbsp;
          router-link.link(to="/users/sign_up") Sign Up
</template>

<script>
  import TopNavbar from "../components/TopNavbar";

  export default {
    components: { TopNavbar },
    data() {
      return {
        error: "",
        show: true,
        errors: {},

        form: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault();

        const data = {
          user: {
            password: this.form.password,
            email: this.form.email.toLowerCase()
          }
        }

        this.$store.dispatch('signIn', data).then((response) => {
          this.error = response.error || ""
          this.errors = response.errors || {}

          response.router_name

          const data = {
            name: response.router_name,
            params: {
              form: this.form,
              emailVerified: response.email_verified
            }
          }

          this.$router.push(data);
        }).catch(fault => {
          if (fault.data.errors) {
            this.errors = fault.data.errors;
          } else { this.errors = {} }

          if (fault.data.error) {
            this.error = fault.data.error;
          } else { this.error = "" }
        })
      },
      onChangeInput(key) {
        if (this.errors[key]) delete this.errors[key]
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
    }
  }
</script>

<style module>
  @import "../styles.css";
</style>
