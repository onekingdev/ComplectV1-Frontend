<template lang="pug">
  tr
    td.text-right {{ item.date }}
    td: span.link {{ item.name }}
    td {{ planName }}
    td.text-right {{ item.price }}
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
      }
    },
    methods: {
      dowloadInvoice() {
        window.open(this.item.invoice_pdf, "_self")
      }
    }
  }
</script>

