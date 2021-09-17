<template lang="pug">
  div.profile
    .container-fluid
      .row.pb-5
        .col-md-9.mx-auto.mt-3
          .card
            .card-header
              h3.m-y-0 Profile
            .card-body.white-card-body
              b-tabs(content-class="mt-0")
                b-tab(title="About" active)
                  MyProfile
                b-tab(title="Settings")
                  Settings
</template>

<script>
  import MyProfile from "./components/MyProfile";
  import Settings from "./components/Settings";

  export default {
    components: {
      MyProfile,
      Settings,
    },
  }
</script>

