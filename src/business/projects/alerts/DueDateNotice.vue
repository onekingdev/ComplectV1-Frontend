<template lang="pug">
  Notifications.m-b-20(:show="show" :notify="notify")
    ExtendDeadlineModal.m-r-2(@saved="$emit('saved')" :project="project" :project-id="project.id")
      button.btn.btn-default Extend

</template>

<script>
  import Notifications from "@/common/Notifications/Notifications";
  import ExtendDeadlineModal from '../ExtendDeadlineModal'
  export default {
    props: {
      project: {
        type: Object,
        required: true
      }
    },
    components: {
      Notifications,
      ExtendDeadlineModal,
    },
    data() {
      return {
        notify: {
          show: 'show',
          mainText: `Contract deadline is tommorow`,
          subText: 'Do you need to extend the contract deadline?',
          variant: 'warning',
          dismissible: true,
          icon: null,
          scale: 2,
        },
      }
    },
    computed: {
      confirmModalId() {
        return (this.modalId || '') + '_confirm'
      },
      show() {
        const d = new Date;
        const tommorow = d.getDate() + 1
        const end = +this.project.ends_on.split('-')[2]
        return tommorow === end
      }
    }
  }
</script>

<style scoped>
  .alert-primary {
    background-color: #fff7e4;
    box-shadow: inset 5px 0 0 #ffc900;
  }
</style>
