<template lang="pug">
  tr
    td
      .d-flex
        .link {{ item.business_name }}
    td
      .role-info
        ion-icon.role-info__icon.role-info__icon_admin(v-if="item.role === 'admin'" name="people")
        ion-icon.role-info__icon.role-info__icon_trusted(v-if="item.role === 'trusted'" name="checkmark")
        ion-icon.role-info__icon.role-info__icon_basic(v-if="item.role === 'basic'" name="person-circle-outline")
        span.ml-3 {{ item.role | capital }}
    td
      b-badge.status(:variant="item.status ? 'success' : 'light'") {{ item.status ? 'Active' : 'Inactive' }}
</template>

<script>
import UserAvatar from '@/common/UserAvatar'
export default {
  name: "roleItem",
  props: ['item'],
  components: {
    UserAvatar,
  },
}
</script>

