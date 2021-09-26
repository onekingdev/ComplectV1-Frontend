<template lang="pug">
  span(@click.stop.prevent="submit" :class="{alignRight}")
    slot
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    method: {
      type: String,
      default: 'POST'
    },
    alignRight: Boolean
  },
  methods: {
    submit() {
      this.$emit('errors', [])
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...this.$store.getters.authHeaders.headers,
        ...this.headers
      }
      const businessId = window.localStorage["app.business_id"]
      if (businessId) headers['business_id'] = businessId
      fetch(this.$store.getters.backendUrl+this.action, {
        method: this.method,
        headers: headers,
        body: JSON.stringify(this.model)
      }).then(response => {
        if (response.status === 422) {
          response.json().then(errors => this.$emit('errors', errors))
            .catch(() => this.toast('Error', 'Couldn\'t submit form: Unknown error', true))
        } else if (response.status >= 200 && response.status <= 299) {
          this.$emit('saved', response)
        } else {
          this.toast('Error', 'Couldn\'t submit form', true)
        }
      })
    }
  }
}
</script>

<style scoped>
  span.alignRight {
    display: flex;
    justify-content: flex-end;
  }
</style>
