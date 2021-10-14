<template lang="pug">
  div
    .row
      .col
        .card.settings__card
          .card-title.px-3.px-xl-5.py-xl-4.mb-0
            h3.mb-0 Role and Permissions
          .card-body.white-card-body.px-3.px-xl-5
            .row.my-3
              .col
                h4 Clients
            .row
              .col-12
                Loading
                RolesTable(v-if="!loading" :users="users")
                EmptyState(v-if="!users.length")
</template>

<script>
  import { mapGetters, mapActions } from "vuex"
  import Loading from '@/common/Loading/Loading'
  import RolesTable from "./components/RolesTable";

  export default {
    components: {
      Loading,
      RolesTable,
    },
    data() {
      return {
        users: []
      };
    },
    methods: {
      ...mapActions({
        getClient: 'settings/getSpecialistClient',
      }),
    },
    computed: {
      ...mapGetters({
        loading: 'loading'
      }),
    },
    async mounted() {
      try {
        const result = await this.getClient()
        if (result) {
          this.users = result
        }
      } catch (error) {
        console.error(error)
      }
    },
  };
</script>
