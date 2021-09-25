import FileUpload from '@/common/FileUpload'
import { DateTime } from 'luxon'
import {
  PRICING_TYPES_OPTIONS,
  FIXED_PAYMENT_SCHEDULE_OPTIONS_FILTERED,
  HOURLY_PAYMENT_SCHEDULE_OPTIONS_FILTERED
} from '@/common/ProjectInputOptions'


const MAX_FILE_SIZE = 2 // MB
const FIXED_BUDGET = Object.keys(PRICING_TYPES_OPTIONS)[0]

export default {
  components: {
    FileUpload
  },
  data() {
    return {
      errors: {}
    }
  },
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  computed: {
    pricingTypesOptions: () => PRICING_TYPES_OPTIONS,
    fixedPaymentScheduleOptions() {
      return FIXED_PAYMENT_SCHEDULE_OPTIONS_FILTERED(this.form.starts_on, this.form.ends_on)
    },
    hourlyPaymentScheduleOptions() {
      return HOURLY_PAYMENT_SCHEDULE_OPTIONS_FILTERED(this.form.starts_on, this.form.ends_on)
    },
    isFixedBudget() {
      return FIXED_BUDGET === this.form.pricing_type
    },
    fileObject() {
      if (this.form.document.lastModified) {
        return {
          name: this.form.document.name,
          url: URL.createObjectURL(this.form.document)
        }
      }

      if (this.proposal && this.proposal.attachment) {
        return {
          name: this.proposal.attachment.name,
          url: this.attachmentUrl
        }
      }

      return null
    }
  },
  methods: {
    removeFile() {
      this.form.document = null
    },
    changePaymentType() {
      if (this.form.pricing_type === 'fixed') {
        this.form.fixed_payment_schedule = Object.keys(this.fixedPaymentScheduleOptions)[0]
        this.form.hourly_payment_schedule = null
      } else {
        this.form.hourly_payment_schedule = Object.keys(this.hourlyPaymentScheduleOptions)[0]
        this.form.fixed_payment_schedule = null
      }
    },
    submitData() {
      const fields = Object.keys(this.form)
      const formData = new FormData()
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        if (field !== 'document') formData.append(field, this.form[field])
      }
      if (this.form.document) formData.append('document', this.form.document)
      return formData
    },
    pickFile(event) {
      this.form.document = event.target.files[0]
    },
    validate() {
      this.errors = {}
      const projectStartDate = DateTime.fromISO(this.project.starts_on)
      const projectEndDate = DateTime.fromISO(this.project.ends_on)
      const proposalStartDate = DateTime.fromISO(this.form.starts_on)
      const proposalEndDate =  DateTime.fromISO(this.form.ends_on)
      
      if (proposalStartDate && proposalStartDate < DateTime.now()) this.$set(this.errors, 'starts_on', ['Start date cannot be in the past'])
      if (!this.form.starts_on) this.$set(this.errors, 'starts_on', ['Required field'])
      if (!this.form.ends_on) this.$set(this.errors, 'ends_on', ['Required field'])
      if (proposalStartDate && proposalEndDate && proposalStartDate > proposalEndDate) this.$set(this.errors, 'ends_on', ['Date must be before start date'])
      if (proposalStartDate < projectStartDate) this.$set(this.errors, 'starts_on', [`Date must be after ${projectStartDate.toFormat('MM/dd/yyyy')}`])
      if (projectEndDate < proposalEndDate) this.$set(this.errors, 'ends_on', [`Date must be before ${projectEndDate.toFormat('MM/dd/yyyy')}`])
      if (!this.form.role_details) this.$set(this.errors, 'role_details', ['Required field'])
      if (!this.form.key_deliverables) this.$set(this.errors, 'key_deliverables', ['Required field'])
      if (this.isFixedBudget) {
        if (!this.form.fixed_budget) this.$set(this.errors, 'fixed_budget', ['Required field'])
        if (!this.form.fixed_payment_schedule) this.$set(this.errors, 'fixed_payment_schedule', ['Required field'])
      } else {
        if (!this.form.hourly_rate) this.$set(this.errors, 'hourly_rate', ['Required field'])
        if (!this.form.hourly_payment_schedule) this.$set(this.errors, 'hourly_payment_schedule', ['Required field'])
        if (!this.form.estimated_hours) this.$set(this.errors, 'estimated_hours', ['Required field'])
      }

      if (this.form.document && this.form.document.lastModified) {
        const fileSize = this.form.document.size / 1024 / 1024
        if (fileSize > MAX_FILE_SIZE) {
          this.toast('Error', 'Document has not been uploaded. File size must be less than 2MB.', true)
          this.$set(this.errors, 'document', ['File size must be less than 2MB.'])
        }
        const type = this.form.document.type
        if (type !== "application/pdf") {
          this.toast('Error', 'Document has not been uploaded. Invalid file type.', true)
          this.$set(this.errors, 'document', ['Invalid file type.'])
        }
      }
    },
  }
}
