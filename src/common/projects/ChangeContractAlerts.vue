<template lang="pug">
  div(v-if="hasChanges || isSuggestionVisible")
    .alert.alert-warning.m-b-20(v-if="hasChanges && !isMyChange && project.extension.ends_on_only")
      h4.alert-heading Contract extension till {{ project.extension.ends_on | asDate }} requested
      p.mb-0
        Post(:action="`${submitUrl}/1`" method="PUT" :model="{confirm:true}" @saved="saved('Deadline extended')")
          button.btn.btn-default.float-right Accept
        Post(:action="`${submitUrl}/1`" method="PUT" :model="{deny:true}" @saved="saved('Deadline extension denied')")
          button.btn.btn-default.float-right.m-r-1 Deny
        | {{ counterpartyName }} has requested to extend the contract.
    .alert.alert-warning.m-b-20(v-else-if="hasChanges && !isMyChange")
      h4.alert-heading Modification to contract terms requested
      p.mb-0
        | {{ counterpartyName }} has requested to modify the terms of the contract.
        ApproveContractChangesModal(:project="project" @saved="$emit('saved')")
    Notifications.m-b-20(v-else-if="isSuggestionVisible" :notify="notifyDueDate")
      button.btn.btn-default.m-r-2(v-b-modal="'ExtendDeadlineModal'") Extend
        b-modal(id="ExtendDeadlineModal" title="Extend Deadline")
          InputDate(v-model="form.ends_on" :errors="errors.ends_on" :options="datepickerOptions") New Due Date
          template(#modal-footer="{ hide }")
            button.btn.btn-link.float-right(@click="hide") Cancel
            Post(:action="submitUrl" :model="form" @errors="errors = $event" @saved="saved('Contract extension has been requested.')")
              button.btn.btn-dark.float-right Confirm
    //.alert.alert-warning.m-b-20(v-else-if="isSuggestionVisible")
    //  h4.alert-heading Contract deadline is tomorrow
    //  p.mb-0
    //    button.btn.btn-default.float-right(v-b-modal="'ExtendDeadlineModal'") Extend
    //    | Contract ends tomorrow and outstanding invoices will automatically be processed. Do you need to extend the deadline?
    //    b-modal(id="ExtendDeadlineModal" title="Extend Deadline")
    //      InputDate(v-model="form.ends_on" :errors="errors.ends_on" :options="datepickerOptions") New Due Date
    //      template(#modal-footer="{ hide }")
    //        button.btn.btn-link.float-right(@click="hide") Cancel
    //        Post(:action="submitUrl" :model="form" @errors="errors = $event" @saved="saved('Contract extension has been requested.')")
    //          button.btn.btn-dark.float-right Confirm
</template>

<script>
import Notifications from "@/common/Notifications/Notifications";
import ApproveContractChangesModal from './ApproveContractChangesModal'
import { DateTime } from 'luxon'

const TYPES = ['Business', 'Specialist']

export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    for: {
      type: String,
      validator: value => TYPES.includes(value),
      required: true
    }
  },
  data() {
    return {
      form: {
        ends_on_only: true,
        ends_on: null
      },
      errors: {},
      notifyDueDate: {
        show: 'show',
        mainText: `Contract deadline is tomorrow`,
        subText: 'Contract ends tomorrow and outstanding invoices will automatically be processed. Do you need to extend the deadline?',
        variant: 'warning',
        dismissible: true,
        icon: null,
        scale: 2,
      },
    }
  },
  methods: {
    saved(message) {
      this.toast('Success', message)
      this.$emit('saved')
    }
  },
  computed: {
    counterpartyType() {
      return TYPES.find(type => type !== this.for).toLowerCase()
    },
    counterpartyName() {
      const i = TYPES.indexOf(this.for), { business, specialist } = this.project
      return [business.business_name, `${specialist.first_name} ${specialist.last_name}`][i]
    },
    hasChanges() {
      return this.project.extension && this.project.extension.requester
    },
    isMyChange() {
      return this.hasChanges && this.project.extension.requester.startsWith(this.for)
    },
    isSuggestionVisible() {
      return this.project.specialist_id && DateTime.local().plus({ days: 1 }).toSQLDate() === this.project.ends_on
    },
    datepickerOptions() {
      return { min: DateTime.local().plus({ days: 1 }).toJSDate().toISOString() }
    },
    submitUrl() {
      return '/api/projects/' + this.project.id + '/extension'
    }
  },
  components: {
    Notifications,
    ApproveContractChangesModal,
  }
}
</script>
