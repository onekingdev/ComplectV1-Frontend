<template lang="pug">
  Notifications.m-b-20(:show="show" :notify="notify")
    ExtendDeadlineModal.m-r-2(@saved="$emit('saved')" :project="project" :project-id="project.id")
      button.btn.btn-default Extend
  //b-alert(:show="show" variant="primary")
  //  .d-flex.align-items-center
  //    b-icon.m-r-2.m-l-1(icon="exclamation-triangle-fill" scale="2" variant="warning")
  //    .d-block.mr-auto
  //      h4: b Contract deadline is tommorow
  //      p.mb-0 Do you need to extend the contract deadline?
  //    ExtendDeadlineModal(@saved="$emit('saved')" :project="project" :project-id="project.id")
  //      button.btn.btn-default Extend

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
