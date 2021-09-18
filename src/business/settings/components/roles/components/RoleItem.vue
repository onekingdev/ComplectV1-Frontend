<template lang="pug">
  tr
    td
      .d-flex
        UserAvatar(:user="item")
        //- MessagesModalCreate.m-l-1.mt-2.mb-0(:item="item")
          .link {{ item.first_name + ' ' +  item.last_name }}
        .m-l-1.mt-2.mb-0 {{ item.first_name + ' ' +  item.last_name }}
    td
      .role-info
        ion-icon.role-info__icon.role-info__icon_admin(v-if="item.seat_role === 'admin'" name="people")
        ion-icon.role-info__icon.role-info__icon_trusted(v-if="item.seat_role === 'trusted'" name="checkmark")
        ion-icon.role-info__icon.role-info__icon_basic(v-if="item.seat_role === 'basic'" name="person-circle-outline")
        span.ml-3 {{ item.seat_role | capital }}
    td
      b-badge.status(:variant="item.status ? 'success' : 'light'") {{ item.status ? 'Active' : 'Inactive' }}
    td.text-right
      b-dropdown.actions(size="sm" variant="none" class="m-0 p-0" right)
        template(#button-content)
          b-icon(icon="three-dots")
        RolesModalEdit(:user="item" :inline="false")
          b-dropdown-item Edit
        //- b-dropdown-item View Contract
</template>

<script>
  import UserAvatar from '@/common/UserAvatar'
  // import MessagesModalCreate from "../../../../notifications/components/center/modals/MessagesModalCreate";
  import RolesModalEdit from "@/common/Users/modals/RolesModalEdit";

  export default {
    name: "roleItem",
    props: ['item'],
    components: {
      RolesModalEdit,
      // MessagesModalCreate,
      UserAvatar,
    }
  }
</script>