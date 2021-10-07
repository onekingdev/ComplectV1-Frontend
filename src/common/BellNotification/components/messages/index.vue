<template lang="pug">
  div
    .row
      .col
        Loading
    .row(v-if='!loading')
      .col
        .card.settings__card.overflow-wrap
          .card-title.px-3.px-xl-5.py-xl-4.mb-0
            h3.mb-0 Messages
          .card-body.white-card-body.px-3.px-xl-5
            .settings___card--internal.p-y-1
              .row
                .col
                  MessagesList(:messages="messages")
                  div(v-if="messages && !messages.length") Messages for today not exist
</template>

<script>
  // import { DateTime } from 'luxon'
  import Loading from '@/common/Loading/Loading'
  import MessagesList from "./components/MessagesList";

  // var today = DateTime.now().toLocaleString(DateTime.DATE_FULL)

  export default {
    components: {
      MessagesList,
      Loading,
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      messages() {
        return this.$store.getters.directMessages
      }
    },
  };
</script>
