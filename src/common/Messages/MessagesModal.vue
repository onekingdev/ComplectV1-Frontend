<template lang="pug">
  div
    div(v-b-modal="modalId")
      slot
    b-modal.fade(:id="modalId" :title="`Messages with ${application.specialist.first_name}`" size="xl" no-stacking)
      .messages-modal
        .info-box
          .header
            UserAvatar(:user="application.specialist" :bg="true")
            .name {{ contact.meta.name }}
            StarsRating(:rate="contact.meta.rating")
          .details
            .section(v-for="(content, title) in proposal ? contact.proposal : contact.details")
              .title {{ title }}
              .content {{ content }}
          
        .messages-box
          .messages
            Get(:messages="`/api/messages/${contact.meta.id}`" :etag="etagMessages"): template(v-slot="{ messages }"): .card-body.p-0
              Messages(:messages="messages" ref="Messages" @created="scrollMessages" @saved="newEtagMessages")
          .input-area
            label.form-label Comment
            textarea-autosize.w-100.form-control.d-block(v-model="message.message" :min-height="100")
            Errors(:errors="messageErrors.message")
            Post(:action="`/api/messages/${contact.meta.id}`" :model="{ message }" @errors="messageErrors = $event" @saved="messageSaved" alignRight)
              button.btn.btn-primary.save-comment-btn Send

      
      
      template(v-if="proposal" #modal-footer="{ ok, cancel, hide }")
        button.btn.btn-link(@click="hide") Cancel
        button.btn.btn-outline-dark(v-if="!hasSpecialist(application.project)" v-b-modal="'DenyProposalConfirm'") Reject
        button.btn.btn-dark(v-if="!hasSpecialist(application.project)" v-b-modal="confirmModalId") Accept
      template(v-else #modal-footer="{ hide }")
        button.btn.btn-link(@click="hide") Cancel
        button.btn.btn-dark Add to Contacts

</template>


<script>
import StarsRating from "@/business/marketplace/components/StarsRating"
import Messages from '@/common/Messages'
import EtaggerMixin from '@/mixins/EtaggerMixin'

export default {
  components: {
    StarsRating,
    Messages
  },
  mixins: [
    EtaggerMixin(),
    EtaggerMixin('etagMessages'),
  ],
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
        message: null
      },
      messageErrors: {},
      errors: {}
    }
  },
  computed: {
    hasSpecialist: () => project => !!project.specialist_id,
    proposal() {
      // need to check, if specialist already in project or not
      return true
    },
    contact() {
      const bidPrice = this.application.pricing_type === 'hourly' ? this.application.hourly_rate : this.application.fixed_budget
      return {
        meta: {
          id: this.application.specialist_id,
          name: `${this.application.specialist.first_name} ${this.application.specialist.last_name}`,
          rating: this.application.specialist.ratings_average,
        },
        details: {
          "Rate": '$'+this.application.specialist.min_hourly_rate,
          "Industries": this.application.specialist.industries.map(industry => industry.name).join(', '),
          "Jurisdictions": this.application.specialist.jurisdictions.map(jurisdiction => jurisdiction.name).join(', '),
          "About Me": this.application.specialist.description,
        },
        proposal: {
          "Start Date": this.formattedDate(this.application.starts_on),
          "Due Date": this.formattedDate(this.application.ends_on),
          "Bid Price": '$' + bidPrice,
          "Payment Schedule": this.formattedPaymentType(this.application.payment_schedule),
          "Role Details": this.application.role_details,
          "Key Deliverables": this.application.key_deliverables,
        }
      }
    }
  },
  methods: {
    scrollMessages() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.Messages.$refs.MessagesContainer
        messagesContainer && setTimeout(() => messagesContainer.scrollTop = messagesContainer.scrollHeight, 500)
      })
    },
    formattedDate(date) {
      const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(date + 'T00:00:00').toLocaleString('en-US', options)
    },
    formattedPaymentType(type) {
      let paymentType;
      switch(type) {
        case 'upfront':
          paymentType = 'Upfront';
          break;
        case 'fifty_fifty':
          paymentType = '50/50';
          break;
        case 'upon_completion':
          paymentType = 'Upon Completion';
          break;
        default:
          paymentType = '';
      }
      return paymentType
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
  .info-box, .messages-box {
    border: solid 1px #DCDEE4;
    border-radius: 4px;
  }
  .info-box {
    flex: 1 2 250px;
    font-size: 0.875rem;
    display: flex;
    flex-direction: column;
    min-height: 0;
    .header {
      flex: 0;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .name {
        margin: 0.5rem 0;
      }
    }
    .details {
      flex: 1;
      max-height: 350px;
      overflow-y: auto;
      border-top: solid 1px #DCDEE4;
      .section {
        padding: 1.25rem;
        border-top: solid 1px #DCDEE4;
        &:first-child {
          border: none
        }
        .title {
          font-weight: bold;
        }
      }
    }
  }
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