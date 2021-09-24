<template lang="pug">
  div
    .messages.justify-content-center.align-items.center.text-center(v-if="!messages.length")
      h4 No Comments to Display
      p.mb-0 Type in the comment box below to get started
    .messages(v-if="messages && messages.length" ref="MessagesContainer")
      .message(v-for="(message, i) in messages" :key="i" class="pb-0")
        .d-flex.align-items-start
          UserAvatar(:user="message.sender")
          .d-block.text-left
            p.message__user-name {{ message.sender.first_name }} {{ message.sender.last_name }} commented.
            p.message__comment(v-html="message.message")
            .row(:class="message.file_url ? 'm-t-10' : ''")
              template(v-if="message.file_url")
                .col-12.m-b-1
                  .file-card
                    div
                      b-icon.file-card__icon(icon="file-earmark-text-fill" font-scale="2")
                    div.ml-0.mr-auto
                      p.file-card__name {{ message.file_name }}
                      a.file-card__link.link(v-download="message") Download
                    div.ml-auto.align-self-start.actions
                      b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
                        template(#button-content)
                          b-icon(icon="three-dots")
                        CommonDeleteModal(title="Delete File" content="" @deleteConfirmed="deleteFile(message.id)" :inline="true")
                          b-dropdown-item.delete Delete File
          .d-block.text-right.ml-auto
            p.message__date {{ message.created_at | asDate }}
</template>

<script>
  import CommonDeleteModal from '@/common/Modals/CommonDeleteModal'
  import { DateTime } from 'luxon'
  var today = DateTime.now().toLocaleString(DateTime.DATE_FULL)

  export default {
    props: {
      messages: {
        type: Array,
        required: true
      }
    },
    created() {
      this.$emit('created')
    },
    methods: {
      async deleteFile(id) {
        try {
          await this.$store.dispatch('reminders/deleteTaskMessageById', id)
          this.toast('Success', `File deleted`)
          this.$emit('saved')
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      }
    },
    components: {
      CommonDeleteModal
    }
  }
</script>
