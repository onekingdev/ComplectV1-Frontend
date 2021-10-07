<template lang="pug">
  div
    .row
      .col
        Loading
    .row(v-if='!loading')
      .col
        .card.settings__card.overflow-wrap
          .card-title.px-3.px-xl-5.py-xl-4.mb-0
            h3.mb-0 Notification Center
          .card-body.white-card-body.px-3.px-xl-5
            .settings___card--internal.p-y-1
              .row.m-b-1
                .col
                  h4 Today
              .row
                .col
                  NotificationsList(:notifications="notificationsToday")
                  div(v-if="notificationsToday && !notificationsToday.length") Notifications for today not exist
            .settings___card--internal.p-y-1
              .row.m-b-1
                .col
                  h4 Previous
              .row
                .col
                  NotificationsList(:notifications="notificationsNotToday")
                   div(v-if="notificationsNotToday && !notificationsNotToday.length") Notifications not exist
</template>

<script>
  import { DateTime } from 'luxon'
  import Loading from '@/common/Loading/Loading'
  import NotificationsList from "./components/NotificationsList";

  var today = DateTime.now().toLocaleString(DateTime.DATE_FULL)

  export default {
    components: {
      NotificationsList,
      Loading,
    },
    data() {
      return {
        notifications: []
      };
    },
    methods: {
      async getNotifications() {
        const res = await this.$store.dispatch('getNotifications')
        if (res) {
          this.notifications = res
        }
      },
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      notificationsToday() {
        return this.notifications.filter(notify => {
          const date = DateTime.fromJSDate(new Date(notify.created_at))
            if (date.toLocaleString(DateTime.DATE_FULL) === today) {
              return date.toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: true })
            }
        })
      },
      notificationsNotToday() {
        return this.notifications.filter(notify => {
          const date = DateTime.fromJSDate(new Date(notify.created_at))
          if (date.toLocaleString(DateTime.DATE_FULL) !== today) {
            return date.toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: true })
          }
        })
      }
    },
    mounted() {
      this.$store.dispatch('readAllNotification')
      this.getNotifications()
    },
  };
</script>
