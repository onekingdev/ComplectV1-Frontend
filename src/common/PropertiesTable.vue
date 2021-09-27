<template lang="pug">
  .card
    .card-header.d-flex.justify-content-between
      h3 {{ title }}
      slot
    .card-body.properties-table
      .row(v-for="(property, i) in propertiesList" :key="i")
        .col-sm-3: span.text-muted.table-keys {{ property.name }}
        .col-sm-9
          a.link(v-if="property.type ==='link'" :href="property.url") {{ property.valueFiltered }}
          span(v-else) {{ property.valueFiltered }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    properties: {
      type: Array,
      required: true
    }
  },
  filters: {
    none(val) {
      return val
    }
  },
  computed: {
    propertiesList() {
      return this.properties.map(prop => ({
        ...prop,
        valueFiltered: this.$options.filters[prop.filter || 'none'](prop.value)
      }))
    }
  }
}
</script>