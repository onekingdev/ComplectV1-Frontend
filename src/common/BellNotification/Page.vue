<template lang="pug">
  div.settings
    .container-fluid
      .row.p-t-3
        .col-md-3
          .panel-default
            ul.settings-nav
              li.settings-nav__item(v-for='(item, idx) in menu' :key="idx" @click="openSetting(item.component, $event)" :class="{ active: idx === 0 }")
                .settings-nav__link {{ item.name }}
        .col-md-9
          component(v-bind:is="component")

</template>

<script>
import Loading from '@/common/Loading/Loading'
import NotificationCenter from "./components/center";
import Messages from "./components/messages";

export default {
  components: {
    Loading,
    NotificationCenter,
    Messages
  },
  created() {
    this.component = NotificationCenter
  },
  data() {
    return {
      component: '',
      menu: [
        { name: 'Notification Center', component: 'NotificationCenter' },
        { name: 'Messages', component: 'Messages' },
      ]
    };
  },
  methods: {
    openSetting (name, event) {
      this.component = name;

      // const allLinks = document.querySelectorAll('.settings-nav__item')
      // console.log(allLinks)

      document.querySelectorAll('.settings-nav__item').forEach(function (link, i) {
        link.classList.remove('active')
      });
      event.target.classList.add('active')
      // const baseUrl = new URL(window.location.origin);
      // window.history.pushState({}, name, `${baseUrl}business/settings/${name.toLowerCase()}`);
    }
  },
  mounted() {
    this.$store.dispatch('getNotificationMessages')
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  }
};
</script>

<style>
  @import "./styles.css";
</style>
