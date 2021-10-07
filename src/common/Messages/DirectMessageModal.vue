<template lang="pug">
  div
    div(v-b-modal="modalId")
      slot
    b-modal.fade(:id="modalId" :title="`Messages with ${targetUser.name}`" no-stacking)
      .messages-modal          
        .messages-box
          .messages
            Get(:messages="`/api/messages/${targetUser.id}`" :etag="etagMessages"): template(v-slot="{ messages }"): .card-body.p-0
              Messages(:messages="messages" ref="Messages" @created="scrollMessages" @saved="newEtagMessages")
          .input-area
            label.form-label Comment
            textarea-autosize.w-100.form-control.d-block(v-model="message.message" :min-height="100")
            Errors(:errors="messageErrors.message")
            Post(:action="`/api/messages/${targetUser.id}`" :model="{ message }" @errors="messageErrors = $event" @saved="messageSaved" alignRight)
              button.btn.btn-primary.save-comment-btn Send
</template>
<script>
import Messages from '@/common/Messages'
import EtaggerMixin from '@/mixins/EtaggerMixin'

export default {
  components: {
    Messages
  },
  mixins: [
    EtaggerMixin(),
    EtaggerMixin('etagMessages'),
  ],
  props: {
    targetUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      message: {
        message: null
      },
      messageErrors: {},
      errors: {},
      modalId: 'modal_' + Math.random().toFixed(9) + Math.random().toFixed(7)
    }
  },
  methods: {
    scrollMessages() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.Messages.$refs.MessagesContainer
        messagesContainer && setTimeout(() => messagesContainer.scrollTop = messagesContainer.scrollHeight, 500)
      })
    },
    messageSaved() {
      this.newEtagMessages()
      this.message.message = null
      this.messageErrors = {}
      this.scrollMessages()
    },
  }
}
</script>
<style lang="scss">
.modal-title {
  text-transform: none
}
</style>

<style lang="scss" scoped>
.messages-modal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  .messages-box {
    flex: 3 0 auto;
    ::v-deep .message {
      margin: 0 1rem;
      &:last-child {
        border-bottom: 0
      }
    }
    .input-area {
      border-top: solid 1px #DCDEE4;
      padding: 1.25rem;
    }
  }
}
</style>