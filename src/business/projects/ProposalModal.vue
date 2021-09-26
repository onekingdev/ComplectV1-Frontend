<template lang="pug">
  b-modal.fade(:id="modalId" :title="`Messages with ${application.specialist.first_name}`" size="xl" no-stacking)
    .proposal-box
      .info-box
        .header
          UserAvatar(:user="application.specialist" :bg="true")
          .name {{ application.specialist.first_name }} {{ application.specialist.last_name }}
          .location {{ application.specialist.location }}
          StarsRating(:rate="application.specialist.ratings_average")
        .content
          .section(v-for="(content, title) in specialistInformation")
            .title {{ title }}
            .content {{ content }}
      .messages-box
        Get(:messages="`/api/reminders/${taskId}/messages`" :etag="etagMessages"): template(v-slot="{ messages }"): .card-body.p-0
          Messages(:messages="messages" ref="Messages" @created="scrollMessages" @saved="newEtagMessages")
        .input-area
          label.form-label Comment
          textarea-autosize.w-100.form-control.d-block(v-model="message.message" :min-height="100")
          Errors(:errors="errors.message")
          Post(:action="`/api/reminders/${taskId}/messages`" :model="{ message }" @errors="messageErrors = $event" @saved="messageSaved" alignRight)
            button.btn.btn-primary.save-comment-btn Send
</template>

<script>
import SpecialistDetails from './SpecialistDetails'
import StarsRating from "@/business/marketplace/components/StarsRating"
import { FIXED_PAYMENT_SCHEDULE_OPTIONS } from '@/common/ProjectInputOptions'
import Messages from '@/common/Messages'

export default {
  props: {
    modalId: {
      type: String,
      required: true
    },
    confirmModalId: {
      type: String,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    },
    application: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      message: {
        comment: ''
      },
      messages: [],
      // messages: [{"id":42,"sender":{"first_name":"First","last_name":"Business","photo":null},"recipient":null,"message":"\u003cp\u003ewqewqe\u003c/p\u003e","file_data":null,"created_at":"2021-08-25T06:48:06.742Z"},{"id":41,"sender":{"first_name":"First","last_name":"Business","photo":null},"recipient":null,"message":"\u003cp\u003eqewqeqwe\u003c/p\u003e","file_data":null,"created_at":"2021-08-25T06:39:32.441Z"}],
      errors: {},
      files: null
    }
  },
  computed: {
    hasSpecialist: () => project => !!project.specialist_id,
    paymentScheduleReadable: () => application => FIXED_PAYMENT_SCHEDULE_OPTIONS[application.payment_schedule],
    attachmentUrl: () => document => `/uploads/${document.storage}/${document.id}`,
    specialistInformation() {
      return {
        "Rate": '$'+this.application.specialist.min_hourly_rate,
        "Industries": this.application.specialist.industries.map(industry => industry.name).join(', '),
        "Jurisdictions": this.application.specialist.jurisdictions.map(jurisdiction => jurisdiction.name).join(', '),
        "About Me": this.application.specialist.description,
      }
    }
  },
  components: {
    SpecialistDetails,
    StarsRating,
    Messages,
  }
}
</script>

<style lang="scss">
.modal-title {
  text-transform: none
}
</style>

<style lang="scss" scoped>
.proposal-box {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  .info-box, .messages-box {
    // padding: 1.25rem;
    border: solid 1px #DCDEE4;
    border-radius: 4px;
  }
  .info-box {
    flex: 1 1 350px;
    font-size: 0.875rem;
    .header {
      padding: 2rem 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .content {
      .section {
        padding: 1.25rem;
        border-top: solid 1px #DCDEE4;
        .title {
          font-weight: bold;
        }
      }
    }
  }
  .messages-box {
    flex: 1 0 auto;
    .input-area {
      border-top: solid 1px #DCDEE4;
      padding: 1.25rem;
    }
  }
}
</style>