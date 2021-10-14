<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="Add Billing Method" hide-footer)
      .row
        .col-12.m-b-1
          .card.card-billing(@click="methodSelected('ba')")
            .card-body
              .d-flex.justify-content-between
                .d-flex.align-items-center
                  img(src="@/assets/bank-icon.svg" class="card-billing__icon")
                  .d-flex.flex-column.ml-3
                    h3 Bank account
                    p.mb-0 Use your bank account for future payments
                .d-flex.ml-auto.align-items-center
                  b-icon(icon="chevron-right" font-scale="1")
      .row
        .col-12.m-b-1
          .card.card-billing(@click="methodSelected('cc')")
            .card-body
              .d-flex.justify-content-between
                .d-flex.align-items-center
                  img(src="@/assets/card-icon.svg" class="card-billing__icon")
                  .d-flex.flex-column.ml-3
                    h3 Credit Card
                    p.mb-0 Add a card for future payments
                .d-flex.ml-auto.align-items-center
                  b-icon(icon="chevron-right" font-scale="1")
</template>

<script>
  const rnd = () => Math.random().toFixed(10).toString().replace('.', '')

  export default {
    props: {
      inline: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        modalId: `modal_${rnd()}`,

      }
    },
    methods: {
      methodSelected(value) {
        // this.toast('Success', `....`)
        this.$emit('selected', value)
        this.$bvModal.hide(this.modalId)
      },
    },
  }
</script>

<style scoped>
.card-billing {
  transition: background-color 200ms ease-in;
}

.card-billing:hover,
.card-billing:active {
  background-color: #f6f6f8;
  cursor: pointer;
}

.card-billing__icon {
  width: 30px;
}
</style>
