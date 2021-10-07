<template lang="pug">
  div(v-if="hasChanges || isSuggestionVisible")
  
    Notifications.m-b-20(v-if="hasChanges && !isMyChange && project.extension.ends_on_only" :notify="contractExtension")
      Post(:action="`${submitUrl}/1`" method="PUT" :model="{confirm:true}" @saved="saved('Deadline extended')")
        button.btn.btn-default.float-right Accept
      Post(:action="`${submitUrl}/1`" method="PUT" :model="{deny:true}" @saved="saved('Deadline extension denied')")
        button.btn.btn-default.float-right.m-r-1 Deny
    
    Notifications.m-b-20(v-else-if="hasChanges && !isMyChange" :notify="contractModification")
      ApproveContractChangesModal(:project="project" @saved="$emit('saved')")

    Notifications.m-b-20(v-else-if="isSuggestionVisible" :notify="contractDueDate")
      button.btn.btn-default.m-r-2(v-b-modal="'ExtendDeadlineModal'") Extend
        b-modal(id="ExtendDeadlineModal" title="Extends Deadline")
          InputDate(v-model="form.ends_on" :errors="errors.ends_on" :options="datepickerOptions") New Due Date
          template(#modal-footer="{ hide }")
            button.btn.btn-link.float-right(@click="hide") Cancel
            Post(:action="submitUrl" :model="form" @errors="errors = $event" @saved="saved('Contract extension has been requested.')")
              button.btn.btn-dark.float-right Confirm

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
      notifyBase: {
        show: 'show',
        variant: 'warning',
        scale: 2,
      }
    }
  },
  methods: {
    saved(message) {
      this.toast('Success', message)
      this.$emit('saved')
    }
  },
  computed: {
    counterpartyName() {
      const i = TYPES.indexOf(this.for), { business, specialist } = this.project
      return [business.business_name, `${specialist.first_name} ${specialist.last_name}`][i]
    },
    contractExtension() {
      return {
        ...this.notifyBase,
        mainText: `Contract extension till ${this.$options.filters.asDate(this.project.extension.ends_on) } requested`,
        subText: `${this.counterpartyName } has requested to extend the contract.`
      }
    },
    contractModification() {
      return {
        ...this.notifyBase,
        mainText: 'Modification to contract terms requested.',
        subText: `${this.counterpartyName} has requested to modify the terms of the contract.`
      }
    },
    contractDueDate() {
      return {
        ...this.notifyBase,
        mainText: `Contract deadline is tomorrow.`,
        subText: 'Contract ends tomorrow and outstanding invoices will automatically be processed. Do you need to extend the deadline?',
        dismissible: true,
      }
    },

    counterpartyType() {
      return TYPES.find(type => type !== this.for).toLowerCase()
    },
    counterpartyName() {
      const i = TYPES.indexOf(this.for), { business, specialist } = this.project
      return [business.business_name, `${specialist.first_name} ${specialist.last_name}`][i]
    },
    notifyExtend() {
      const i = TYPES.indexOf(this.for), { business, specialist } = this.project
      const counterpartyName = [business.business_name, `${specialist.first_name} ${specialist.last_name}`][i]
      return {...this.notifyExtendBase, subText: `${counterpartyName} has requested to modify the terms of the contract.`,}
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
