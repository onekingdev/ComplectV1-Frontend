<template lang="pug">
  b-list-group-item
    .row
      .col
        .d-flex.align-items-center
          .d-flex.align-items-center.justify-content-center.icon_width
            //- b-icon(v-if="item.type !== 'message'" icon="exclamation-triangle-fill" scale="2" variant="warning")
            UserAvatar(v-if="item.type === 'message'" :user="{photo: item.photo, first_name: item.first_name, last_name: item.last_name}")
          .d-block.ml-4.message-info
            h5.username {{ item.name }}
            p.mb-0.message-content {{ item.message }}
            p.mb-0.time {{ item.created_at | dateToHuman }}
          .d-flex.justify-content-end.align-items-center.h-100.ml-auto
            b-badge.mr-2(v-if="item.newMessage > 0" variant="default") {{ item.newMessage }} New Message
            DirectMessageModal(:targetUser="item")
              b-button.btn.mr-2.font-weight-bold(type='button' variant='default') View
            //- .actions
            //-   b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
            //-     template(#button-content)
            //-       b-icon(icon="three-dots")
            //-     b-dropdown-item-button Edit
            //-     b-dropdown-item-button.delete Delete
</template>

<script>
  import { DateTime } from 'luxon'
  import UserAvatar from '@/common/UserAvatar'
  import DirectMessageModal from '@/common/Messages/DirectMessageModal'

  var today = DateTime.now().toLocaleString(DateTime.DATE_FULL)
  var yesterday = DateTime.now().plus({ days: -1 }).toLocaleString(DateTime.DATE_FULL)

  export default {
    name: "notifyItem",
    props: ['item'],
    components: {
      DirectMessageModal,
      UserAvatar
    },
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      todayMessage (value) {
        const date = DateTime.fromJSDate(new Date(value))
        if (date.toLocaleString(DateTime.DATE_FULL) === today) {
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
          if (date.toLocaleString(DateTime.DATE_FULL) === today) {
            return "Today"
          }
          if (date.toLocaleString(DateTime.DATE_FULL) === yesterday) {
            return "Yesterday"
          }
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
.username {
  font-size: 14px;
  color: #303132;
  font-weight: 600;
}

.message-content {
  font-size: 12px;
  color: #797B7E;
}

.icon_width {
  width: 40px;
}

.time{
  color: #A2A3A9;
  font-size: 12px;
}

.message-info {
  max-width: 69.5rem;
}
</style>
