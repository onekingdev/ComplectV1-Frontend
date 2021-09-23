<template lang="pug">
  .card.m-t-1
    .card-body
      div.d-flex.align-items-center.mt-3
        UserAvatar.mr-3(:business="business")
        span.mr-auto
          span.business-name {{ business.business_name }}
          br
          span.location {{ [business.city, business.state, business.country] | commas }}
    hr
    .card-body
      dl.row
        dt.col-sm-3 Industry
        dd.col-sm-9.semibold {{ business.industries | names}}
        dt.col-sm-3 Jurisdictions
        dd.col-sm-9 {{ business.jurisdictions | names}}
        dt.col-sm-3 AUM
        dd.col-sm-9 {{ business.aum ? business.aum : '' }}
        dt.col-sm-3 Accounts
        dd.col-sm-9 {{ business.client_account_cnt }}
        dt.col-sm-3 Employees
        dd.col-sm-9 {{ business.active_member }} {{ business.active_member > 1 ? 'Employees' : 'Employee'}}
        dt.col-sm-3 Description
        dd.col-sm-9 {{ business.description }}
</template>

<script>
export default {
  props: {
    business: {
      type: Object,
      required: true
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
