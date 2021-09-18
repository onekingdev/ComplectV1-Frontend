<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="Delete risk")
      .row
        .col-md-1.text-center.px-0
          img(src='@/assets/error_20.svg' width="25" height="25")
        .col
          p.paragraph.m-b-10 You are about to delete the risk and romove any connections to its related controls.
          p.paragraph.mb-0
            b Do you want to continue?
      Errors(:errors="errors.title")

      template(slot="modal-footer")
        button.btn.btn-link.mr-2(@click="$bvModal.hide(modalId)") Cancel
        button.btn.btn-dark(@click="submit") Confirm
</template>

<script>
  const rnd = () => Math.random().toFixed(10).toString().replace('.', '')
  export default {
    props: {
      inline: {
        type: Boolean,
        default: true
      },
      riskId: {
        type: Number,
        default: true
      },
    },
    data() {
      return {
        modalId: `modal_${rnd()}`,
        risk: {
          name: '',
          description: 'N/A',
          sections: [],
        },
        errors: []
      }
    },
    methods: {
      submit(e) {
        e.preventDefault();
        this.errors = [];

        this.$emit('deleteConfirmed')
        this.$bvModal.hide(this.modalId)

        if (window.location.href === `${window.location.origin}/business/risks/${this.riskId}`) {
          window.location.href = `${window.location.origin}/business/risks/`
        }
      },
    },
    computed: {

    },
    watch: {

    },
    components: {

    }
  }
</script>
