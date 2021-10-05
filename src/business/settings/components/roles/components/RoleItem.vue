<template lang="pug">
  tr
    td
      .d-flex
        UserAvatar(:user="item")
        .m-l-1.mt-2.mb-0 {{ item.first_name + ' ' +  item.last_name }}
    td
      .role-info
        ion-icon.role-info__icon.role-info__icon_admin.hydrated(v-if="role === 'admin'" name="people")
        ion-icon.role-info__icon.role-info__icon_trusted.hydrated(v-if="role === 'trusted'" name="checkmark")
        ion-icon.role-info__icon.role-info__icon_basic.hydrated(v-if="role === 'basic'" name="person-circle-outline")
        span.ml-2 {{ role | capital }}
    td
      b-badge.status(:variant="item.status === 'active' ? 'success' : 'light'") {{ item.status === 'active' ? 'Active' : 'Inactive' }}
    td.text-right
      b-dropdown.actions(size="sm" variant="none" class="m-0 p-0" right)
        template(#button-content)
          b-icon(icon="three-dots")
        EditRoleModal(:specialist="specialist" :inline="false" @saved="submit")
          b-dropdown-item Edit
</template>

<script>
import UserAvatar from '@/common/UserAvatar'
import EditRoleModal from "@/business/projects/EditRoleModal"

export default {
  name: "roleItem",
  props: ['item'],
  components: {
    EditRoleModal,
    UserAvatar,
  },
  data() {
    return {
      role: '',
    }
  },
  created() {
    this.role = this.item.role
  },
  computed: {
    specialist() {
      const user = this.$store.getters.getUser
      return {
        ...this.item,
        id: this.item.specialist_id,
        ratings_average: this.item.ratings_average ? this.item.ratings_average : Math.floor(Math.random() * 5),
        specialists_business_roles: [{
          business_id: user.id,
          role: this.item.role
        }]
      }
    }
  },
  methods: {
    submit(id, role) {
      const token = localStorage.getItem('app.currentUser.token') ? JSON.parse(localStorage.getItem('app.currentUser.token')) : ''
      fetch(`${this.$store.getters.backendUrl}/api/business/specialist_roles/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `${token}`,  'Accept': 'application/json',  'Content-Type': 'application/json' },
        body: JSON.stringify({ "specialist": { "role": `${role}` } })
      })
        .then(response => response.json())
        .then(result => {
          this.role = role
          this.toast('Success', 'Role has been assigned.')
        })
        .catch(error => console.error(error))
    },
  }
}
</script>
