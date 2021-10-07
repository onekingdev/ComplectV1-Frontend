<template lang="pug">
  .card.m-t-1
    DirectMessageModal(:targetUser="targetUser" customModalId="ChatModal")
    .card-body
      div.d-flex.align-items-center.mt-3
        UserAvatar.mr-3(:business="business")
        span.mr-auto
          span.business-name(@click="openChatModal") {{ business.business_name }}
          br
          span.location {{ [business.city, business.state, business.country] | commas }}
    hr
    .card-body
      dl.row.details-infor
        dt.col-sm-3 Industry
        dd.col-sm-9.semibold {{ business.industries | names}}
        dt.col-sm-3 Jurisdictions
        dd.col-sm-9 {{ business.jurisdictions | names}}
        dt.col-sm-3 AUM
        dd.col-sm-9 {{ Number(business.aum) ? Math.round(business.aum) : '' }}
        dt.col-sm-3 Accounts
        dd.col-sm-9 {{ business.client_account_cnt ? business.client_account_cnt : '' }}
        dt.col-sm-3 Employees
        dd.col-sm-9 {{ business.active_member }}
</template>

<script>
import DirectMessageModal from '@/common/Messages/DirectMessageModal'
export default {
  components: {
    DirectMessageModal
  },
  props: {
    business: {
      type: Object,
      required: true
    }
  },
  computed: {
    targetUser() {
      return {
        name: this.business.business_name,
        id: this.business.id
      }
    }
  },
  methods: {
    openChatModal() {
      this.$bvModal.show('ChatModal')
    }
  }
}
</script>
<style scoped>
.business-name {
  color: #0479FF;
  font-size: 1rem;
  font-weight: 600;
}

.location {
  font-size: 1rem;
  color: #797B7E;
}
</style>
