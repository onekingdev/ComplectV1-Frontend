<template lang="pug">
  div
    .row
      .col
        .card.settings__card
          .card-title.px-3.px-xl-5.mb-0
            h3.mb-0 Role and Permissions
          .card-body.white-card-body.px-3.px-xl-5
            .row.my-3
              .col
                h4.semibold-text Specialists
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
    methods: {
      ...mapActions({
        getEmployeesSpecialists: 'settings/getEmployeesSpecialists',
      }),
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        users: 'settings/employeesSpecialists'
      })
    },
    async mounted() {
      try {
        await this.getEmployeesSpecialists()
      } catch (error) {
        console.error(error)
      }
    }
  };
</script>
