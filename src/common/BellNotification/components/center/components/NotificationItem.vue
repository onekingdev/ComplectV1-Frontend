<template lang="pug">
  b-list-group-item
    .row
      .col-10
        .d-flex.align-items-center
          .d-flex.align-items-center.justify-content-center
            b-icon(v-if="item.type !== 'message'" icon="exclamation-triangle-fill" scale="2" variant="warning")
            //- UserAvatar(v-if="item.type === 'message'" :user="{photo: item.img_path}")
          .d-block.ml-4
            h5.notification-content {{ item.message }}&nbsp;
              //- a.link(:href="item.link") {{ item.action_path }}
              //- span(v-if="tommorowMessage(item.created_at)") &nbsp;is due tommorow
            p.mb-0.time {{ item.created_at | dateToHuman }}
      .col
        .d-flex.justify-content-end.align-items-center.h-100
          a.btn.btn-default(:href="item.action_path" variant='default') View
          //- MessagesModalCreate(v-if="item.type === 'message'" :item="item" )
          //- b-button.btn.mr-2.font-weight-bold(type='button' variant='default') View
          //- button.btn.btn__close
          //-   b-icon(icon="x" font-scale="1")
</template>

<script>
  import { DateTime } from 'luxon'
  import UserAvatar from '@/common/UserAvatar'
  // import MessagesModalCreate from "../modals/MessagesModalCreate";

  // var today = DateTime.now().toLocaleString(DateTime.DATE_FULL)
  var tomorrow = DateTime.now().plus({ days: 1 }).toLocaleString(DateTime.DATE_FULL)

  export default {
    name: "notifyItem",
    props: ['item'],
    components: {
      // MessagesModalCreate,
      UserAvatar
    },
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      tommorowMessage (value) {
        const date = DateTime.fromJSDate(new Date(value))
        if (date.plus({ days: 1 }).toLocaleString(DateTime.DATE_FULL) === tomorrow) {
          return true
        }
        return false
      }
    },
    filters: {
      dateToHuman(value) {
        if (!value) return ''
        const date = DateTime.fromJSDate(new Date(value))
        if (!date.invalid) {
          // return date.toFormat('MM/dd/yyyy')
          return date.toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: true })
        }
        if (date.invalid) {
          return value
        }
      },
    }
  }
</script>

<style scoped>
  .icon_width {
    width: 40px;
  }
  .time{
    color: #a4a5ab;
  }
  
  .notification-content {
    font-size: 14px;
  }
</style>
