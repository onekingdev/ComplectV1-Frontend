<template lang="pug">
  div(v-if="notify")
    Notifications.m-b-20(:notify="notify")
</template>
<script>
import Notifications from "@/common/Notifications/Notifications";
const TYPES = ['Business', 'Specialist']
export default {
  props: {
    for: {
      type: String,
      validator: value => TYPES.includes(value),
      required: true
    },
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    Notifications
  },
  computed: {
    isBusinessDenyContractAccept() {
      if (!this.project.deny_end_request) return false
      return this.for ==='Specialist' && this.project.deny_end_request.find(item => item.requester === 'Specialist')
    },
    businessDenyContractAcceptNotify() {
      return {
        show: true,
        mainText: 'Contract early completion request denied.',
        subText: 'Your request to complete the contract early was denied. You may consider reaching out to negotiate an agreeable resolution.',
        variant: 'primary',
        dismissible: true,
        icon: null,
        scale: 2,
      }
    },
    // modifyNotice() {
    //   const isAccept = this.project.modify_contract.status === 'confirmed'
    //   const title = isAccept ? 'accepted' : 'rejected'
    //   const name = this.for === 'Specialist' ? this.project.business.business_name : `${this.project.specialist.first_name} ${this.project.specialist.last_name}`
    //   return {
    //     show: true,
    //     mainText: `Contraction modification ${title}.`,
    //     subText: `${name} has ${title} your contract modification request.`,
    //     variant: 'primary',
    //     dismissible: true,
    //     icon: null,
    //     scale: 2,
    //   }
    // },
    // hasModifyNotice() {
    //   const modifyContract = this.project.modify_contract
    //   return modifyContract && this.for === modifyContract.requester && (modifyContract.requester === 'Specialist' || modifyContract.requester === 'Business') && modifyContract.status !== null
    // },
    notify() {
      if (this.isBusinessDenyContractAccept) return this.businessDenyContractAcceptNotify
      // if (this.hasModifyNotice) return this.modifyNotice

      return null
    }
  }
}
</script>
