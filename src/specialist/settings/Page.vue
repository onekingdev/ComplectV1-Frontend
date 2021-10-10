<template lang="pug">
  .settings
    .container-fluid
      template(v-if='componentUpgrade')
        .row
          .col-md-9.mx-auto.my-2
            .card
              .card-body
                component(v-bind:is="componentUpgrade" @upgradePlanComplited="upgradePlanComplited" @upgradeBillingComplited="upgradeBillingComplited")
      .row.p-40.p-y-20(v-if='!componentUpgrade')
        .col-md-3
          .panel-default
            ul.settings-nav
              li.settings-nav__item(v-for='(item, idx) in menu' :key="idx" @click.prevent="openSetting(item.link, $event)" :class="{ active: item.link === component }")
                a.settings-nav__link(:href='item.link' @click.prevent) {{ item.name }}
        .col-md-9
          component(v-bind:is="component" :states="states", :timezones="timezones", :contries="contries", :userId="userId" @openComponent="openComponent")

</template>

<script>
  import Loading from '@/common/Loading/Loading'
  import General from "./components/general";
  import Security from "./components/security";
  import Subscriptions from "./components/subscriptions";
  import Roles from "./components/roles";
  import Billings from "./components/billings";
  import Notifications from "./components/notifications";
  import SelectBilling from './components/billings/components/SelectBilling'

  export default {
    props: ['states', 'timezones', 'contries', 'userId'],
    components: {
      Loading,
      General,
      Security,
      Subscriptions,
      Roles,
      Billings,
      Notifications,
      SelectBilling,
    },
    created() {
      this.component = General;
      const pathName = window.location.pathname.split('settings/')[1]
      if(pathName) {
        const pathNameFixed = pathName.charAt(0).toUpperCase() + pathName.slice(1);
        this.openSetting(pathNameFixed)
        console.log(pathNameFixed)
      }
      if(!pathName) this.openSetting('General')
    },
    data() {
      return {
        component: '',
        componentUpgrade: ''
      };
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      menu() {
        let userPlan = this.$store.getters['roles/currentPlan']
        let filterByPlan = userPlan ? this.menuSections.filter(item => item.plan.indexOf( userPlan ) !== -1) : this.menuSections
        return filterByPlan
      },
      menuSections() {
        return [
          { name: 'General', link: 'general', component: General, plan: ['free', 'specialist_pro'] },
          { name: 'Client Permissions', link: 'roles', component: Roles, plan: ['specialist_pro'] },
          { name: 'Security', link: 'security', component: Security, plan: ['free', 'specialist_pro'] },
          { name: 'Subscriptions', link: 'subscriptions', component: Subscriptions, plan: ['free', 'specialist_pro'] },
          { name: 'Billing', link: 'billings', component: Billings, plan: ['free', 'specialist_pro'] }
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
        window.history.pushState({}, name, `${baseUrl}specialist/settings/${name.toLowerCase()}`);
      }
    }
  };
</script>
