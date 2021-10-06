<template lang="pug">
  div
    .container-fluid
      .row.pb-5
        .col-md-9.mx-auto.mt-3
          .card
            .card-header
              h2.heading Profile
            .card-body.white-card-body
              MyProfile
              hr.border-custom(v-if="!basicRole")
            .card-body.white-card-body.company-details(v-if="!basicRole")
              CompanyDetails
</template>

<script>
  import MyProfile from "./components/MyProfile";
  import CompanyDetails from "./components/CompanyDetails";
  export default {
    components: {
      MyProfile,
      CompanyDetails,
    },
    computed: {
      basicRole() {
        return this.$store.getters['roles/currentRole'] == 'basic'
      }
    }
  }
</script>

<style>
  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    margin-bottom: 2rem;
    border: solid 1px #ced4da;
    border-radius: 3px;
    overflow: hidden;
  }

  .preview_sm {
    width: 6.25rem; /* 100px; */
    height: 6.25rem; /* 100px; */
  }
  
  .preview_md {
    width: 7.8125rem; /* 125px; */
    height: 7.8125rem; /* 125px; */
  }
  
  .preview_lg {
    width: 9.375rem; /* 150px; */
    height: 9.375rem; /* 150px; */
  }
  
  .preview img {
    width: 100%;
    object-fit: contain;
  }
  .border-custom {
    margin-top: 35px;
    margin-bottom: -9px;
  }
  .heading {
    font-size: 20px;
  }
  .semibold-text {
    font-size: 20px;
    font-weight: 600;
  }
</style>