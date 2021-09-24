<template lang="pug">
  .card.discussion
    .card-header
      h3.mb-0 Discussion
    Get(:messages="messagesUrl" :etag="etag"): template(v-slot="{messages}")
      .card-body.messages.justify-content-center.align-items.center.text-center(v-if="!messages.length")
        h4 No Comments to Display
        p.mb-0 Type in the comment box below to get started
      .card-body.messages(v-if="messages && messages.length" ref="MessagesContainer")
        .message(v-for="(message, i) in messages" :key="i")
          .d-flex.align-items-start
            UserAvatar(:user="message.sender")
            .d-block.text-left
              p.message__user-name {{ message.sender.first_name }} {{ message.sender.last_name }} commented.
              p.message__comment(v-html="message.message")
            .d-block.text-right.ml-auto
              p.message__date {{ message.created_at | asDate }}
      .card-body
        InputTextarea.m-b-20(v-model="comment.message" placeholder="Make a comment or leave a note..." :errors="commentErrors && commentErrors.message") Comment
        Post(v-bind="postCommentProps" @saved="commentSaved" @errors="commentErrors = $event" alignRight)
          button.btn.btn-primary.save-comment-btn Send
</template>

<script>
import EtaggerMixin from '@/mixins/EtaggerMixin'

const DISCUSSION_UPDATE_PERIOD = 20000

export default {
  mixins: [EtaggerMixin()],
  props: {
    projectId: {
      type: Number,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comment: { message: null },
      commentErrors: null
    }
  },
  created() {
    setInterval(this.newEtag, DISCUSSION_UPDATE_PERIOD)
  },
  methods: {
    commentSaved() {
      this.newEtag()
      this.toast('Success', 'Comment added')
      this.comment.message = null
    },
  },
  computed: {
    postCommentProps() {
      return {
        action: this.messagesUrl,
        model: { message: this.comment },
        headers: { Authorization: this.token },
      }
    },
    messagesUrl() {
      return `/api/local_projects/${this.projectId}/messages`
    },
  }
}
</script>
