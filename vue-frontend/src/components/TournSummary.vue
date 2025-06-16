<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button block v-b-toggle :href="'#accordion-' + tournament.id" variant="outline-dark">{{tournament.name}}</b-button>
    </b-card-header>
    <b-collapse :id="'accordion-' + tournament.id" accordion="my-accordion" role="tab-panel">
      <b-card-body>
        <b-card-text>{{tournament.details}}</b-card-text>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: 'TournSummary',
  props: {
    tournament: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
