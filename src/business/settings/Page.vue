<template lang="pug">
  .settings
    template(v-if='componentUpgrade')
        component(v-bind:is="componentUpgrade" @upgradePlanComplited="upgradePlanComplited" @upgradeBillingComplited="upgradeBillingComplited")
    .container-fluid(v-if='!componentUpgrade')
      .row.p-40.p-y-20
        .col-md-3
          .panel-default
            ul.settings-nav
              li.settings-nav__item(v-for='(item, idx) in menu' :key="idx" @click.prevent="openSetting(item.link, $event)" :class="{ active: item.link === component }")
                a.settings-nav__link(:href='item.link') {{ item.name }}
        .col-md-9
          component(v-bind:is="component" :states="states", :timezones="timezones", :contries="contries", :userId="userId" @openComponent="openComponent")

</template>

<script>
  import Loading from '@/common/Loading/Loading'
  import General from "./components/general";
  import Users from "./components/users";
  import Security from "./components/security";
  import Subscriptions from "./components/subscriptions";
  import Roles from "./components/roles";
  import Billings from "./components/billings";
  import Notifications from "./components/notifications";
  import SelectPlan from './components/subscriptions/components/SelectPlan'
  import SelectBilling from './components/billings/components/SelectBilling'

  export default {
    props: ['states', 'timezones', 'contries', 'userId'],
    components: {
      Loading,
      General,
      Users,
      Security,
      Subscriptions,
      Roles,
      Billings,
      Notifications,
      SelectPlan,
      SelectBilling,
    },
    created() {
      // FOR Hiding Sidebar
      this.$store.commit('changeSidebar', 'settings')

      const pathName = window.location.pathname.split('settings/')[1]
      if(pathName) {
        const pathNameFixed = pathName.charAt(0).toUpperCase() + pathName.slice(1);
        this.openSetting(pathNameFixed)
      }
      if(!pathName) this.openSetting('General')
    },
    data() {
      return {
        component: '',
        componentUpgrade: '',
      };
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      menu() {
        let userPlan = this.$store.getters['roles/currentPlan']
        let userRole = this.$store.getters['roles/currentRole']
        let filterByPlan = userPlan ? this.menuSections.filter(item => item.plan.indexOf( userPlan ) !== -1) : this.menuSections
        let filterByRole = userRole ? filterByPlan.filter(item => item.access.indexOf( userRole ) !== -1) : filterByPlan
        return filterByRole
      },
      menuSections() {
        return [
          { name: 'General', link: 'General', access: ['basic', 'trusted', 'admin'], plan: ['free', 'team', 'business', 'specialist_pro']},
          { name: 'Users', link: 'Users', access: ['trusted', 'admin'], plan: ['team', 'business', 'specialist_pro']},
          { name: 'Roles and Permissions', link: 'Roles', access: ['trusted', 'admin'], plan: ['free', 'team', 'business', 'specialist_pro']},
          { name: 'Security', link: 'Security', access: ['basic', 'trusted', 'admin'], plan: ['free', 'team', 'business', 'specialist_pro']},
          { name: 'Subscriptions', link: 'Subscriptions', access: ['trusted', 'admin'], plan: ['free', 'team', 'business', 'specialist_pro']},
          { name: 'Billing', link: 'Billings', access: ['admin'], plan: ['free', 'team', 'business', 'specialist_pro']},
        ]
      }
    },
    methods: {
      openSetting (name, event) {
        this.component = name;
        document.querySelectorAll('.settings-nav__item').forEach(function (link, i) {
          link.classList.remove('active')
        });
        if(event) event.target.classList.add('active')

        this.navigate(name)
      },
      openComponent (value) {
        this.componentUpgrade = value
      },
      upgradePlanComplited () {
        this.componentUpgrade = ''
        this.toast('Success', 'Plan upgraded.')
      },
      upgradeBillingComplited () {
        this.componentUpgrade = ''
        this.toast('Success', 'Billing upgraded.')
      },
      navigate(name) {
        const baseUrl = new URL(window.location.origin);
        window.history.pushState({}, name, `${baseUrl}business/settings/${name.toLowerCase()}`);
      }
    }
  };
</script>

<style>
  .semibold-text {
    font-size: 20px;
    font-weight: 600;
  }
</style>
