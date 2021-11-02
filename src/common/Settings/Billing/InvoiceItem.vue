<template lang="pug">
  tr
    td.text-right {{ item.date }}
    td: span.link {{ item.name }}
    td {{ planName }}
    td.text-right {{ isNegative ? '-' : '' }}{{ item.price }}
    td.text-right
      b-dropdown.actions(size="sm" variant="none" class="m-0 p-0" right)
        template(#button-content)
          b-icon(icon="three-dots")
        b-dropdown-item(@click="dowloadInvoice") Download
</template>

<script>
  export default {
    name: "appItem",
    props: ['item'],
    data() {
      return {
        statusVariant: 'light',
      }
    },
    computed: {
      planName() {
        if (this.item.invoice_type === 'plan') return 'Plan'
        return 'Project'
      },
      isNegative() {
        const stripeEventType = this.item.stripe_event_type
        if (stripeEventType === 'charge' || stripeEventType === 'refund_reversed') return true
        return false
      }
    },
    methods: {
      dowloadInvoice() {
        window.open(this.item.invoice_pdf, "_self")
      }
    }
  }
</script>

