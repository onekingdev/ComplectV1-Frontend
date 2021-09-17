<template lang="pug">
  .topbar
    .logo(@click="openLink('default')")
      router-link.logo__link(:to='`/${appModule}`')
        img.logo__img.logo__img_small(src='@/assets/primary.svg' width="24" height="24")
    b-navbar.p-0(toggleable='lg')
      b-navbar-toggle.justify-content-center(target='nav-collapse')
        | Menu
        ion-icon.ml-2(name='chevron-down-outline')
      b-collapse#nav-collapse.topbar-menu(v-model="visible")
        ul.topbar-menu__list
          li.nav-item.topbar-menu__item(@click="openLink('default')")
            router-link.topbar-menu__link(:to='`/${appModule}`' active-class="active" exact) Home
          li.nav-item.topbar-menu__item(v-if="appModule === 'business'" @click="openLink('documents')")
            router-link.topbar-menu__link(:to='`/${appModule}/file_folders`' active-class="active") Documents
          li.nav-item.topbar-menu__item(v-if="role !=='basic'" @click="openLink('reports')")
            router-link.topbar-menu__link(:to='reportLink' active-class="active") Reports
          li.nav-item.topbar-menu__item.d-none
            a.topbar-menu__link(aria-current='page' href='#') Community
          li.nav-item.topbar-menu__item.d-sm-none(v-if="appModule !== 'specialist' && role !=='basic'" @click="openLink('default')")
            router-link.topbar-menu__link(:to='`/specialistmarketplace`' active-class="active") Find an Expert
          li.nav-item.topbar-menu__item.d-sm-none(v-if="appModule === 'specialist'" @click="openLink('default')")
            router-link.topbar-menu__link(to='/job_board' active-class="active") Browse Projects
    // Right aligned nav items
    b-navbar-nav.flex-row.align-items-center.ml-auto
      router-link.btn.btn-warning.btn-topbar.btn-topbar_find(v-if="appModule !== 'specialist' && role !=='basic'" :to='`/specialistmarketplace`' target="_blank") Find an Expert
      router-link.btn.btn-warning.btn-topbar.btn-topbar_find(v-if="appModule === 'specialist'" :to='`/specialist/job_board`') Browse Jobs
      router-link.btn.btn-topbar.btn-topbar_notify(:to='`/${appModule}/notification-center`')
        ion-icon(name='notifications-outline')
      b-nav-item-dropdown.topbar-right-dropdown.actions(right)
        // Using 'button-content' slot
        template(#button-content)
          UserAvatar.topbar-right-dropdown__avatar(:user="account" :sm="true")
          span.topbar-right-dropdown__name {{ account.first_name }} {{ account.last_name }}
          ion-icon.topbar-right-dropdown__icon(name='chevron-down-outline')
        li(v-if="activeContracts && activeContracts.length")
          .dropdown-item(@click="openSelectedBusiness(null)") Back
        li(v-if="activeContracts" v-for="(contract, idx) in  activeContracts" :key="idx")
          .dropdown-item(@click="openSelectedBusiness(contract)") {{ contract.business_name }}
        li(@click="openLink('documents')")
          router-link.dropdown-item(:to='`/${appModule}/profile`' active-class="active") Profile
        b-dropdown-item(@click="signOut") Sign Out
</template>

<script>
  import { mapGetters } from "vuex"
  import UserAvatar from '@/common/UserAvatar'

  export default {
    name: "index",
    components: { UserAvatar },
    data() {
      return {
        visible: true,
        account: {
          first_name: '',
          last_name: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        appModule: 'appModule',
        roles: 'roles/roles',
        role: 'roles/currentRole',
      }),
      // It's current active roles (employee attached to Business account and has Roles
      activeContracts () {
        return this.roles
      },
      currentUser() {
        return this.$store.getters.getUser
      },
      reportLink() {
        if (this.appModule === 'business') return `/${this.appModule}/reports/organizations`
        return '/specialist/reports/financials'
      }
    },

    created(){
      window.addEventListener("resize", this.screenWidthChangeHandler);
      if (window.innerWidth < 1000) this.visible = false
      this.setAccount(this.currentUser)
    },
    destroyed() {
      window.removeEventListener("resize", this.screenWidthChangeHandler);
    },
    methods: {
      screenWidthChangeHandler(e) {
        if (window.innerWidth <= 991.98) this.visible = false
        if (window.innerWidth > 991.98) this.visible = true
      },
      signOut() {
        fetch(this.$store.getters.backendUrl + '/api/users/sign_out', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(localStorage.getItem('app.currentUser.token'))
          }
        })
          .then(response => response.json())
          .then(data => {
            localStorage.clear();
            window.location.href = `${window.location.origin}`
          })
          .catch(error => console.error(error))
      },
      openLink (value) {
        if(value === 'reports') {
          this.$store.commit('changeSidebar', 'reports')
          return
        }
        if(value === 'documents') this.$store.commit('changeSidebar', 'documents')
        if(value !== 'documents') this.$store.commit('changeSidebar', 'default')
      },
      //When we logged in as Employee, we can opend dashboard as employee for Business account and see some features based on roles
      openSelectedBusiness (business) {
        if (business) {
          localStorage.setItem('app.business_id', business.business_id)
          localStorage.setItem('app.currentUser.role', business.role)
          window.location.href = `/business`
        }
        if (!business) {
          localStorage.removeItem('app.business_id')
          localStorage.removeItem('app.currentUser.role')
          window.location.href = `/specialist`
        }
      },
      setAccount(user) {
        this.account = {
          first_name: user.contact_first_name ? `${user.contact_first_name}` : `${user.first_name}`,
          last_name: user.contact_last_name ? `${user.contact_last_name}` : `${user.last_name}`,
        }
      }
    },
    watch: {
      '$route' () {
        if(window.innerWidth < 992) this.visible = false
      },
      'currentUser' (newVal) {
        this.setAccount(newVal)
      }
    }
  }
</script>