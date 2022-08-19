<template>
  <b-table responsive bordered dark :fields="tableFields" :items="tournaments" :title="title" hover striped sticky-header show-empty>
    <template #row-details="row">
      <b-tr @click="openTournament(row.item.id)">
        <b-td>{{row.item.id}}</b-td>
        <b-td>{{row.item.name}}</b-td>
        <b-td>{{row.item.stage}}</b-td>
        <b-td><b-button variant="outline-primary" pill @click="editDetails(row.item.id)">Edit</b-button></b-td>
        <b-td><b-button variant="outline-danger" pill @click="deleteTournament(row.item.id)">Delete</b-button></b-td>
      </b-tr>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'TournsTable',
  props: ['title'],
  data: function () {
    return {
      tableFields: [],
      tournaments: []
    }
  },
  methods: {
    openTournament: function (tournId) {
      // open clicked rournament
    },
    deleteTournament: function (tournId) {
      // delete clicked tournament
    },
    editDetails: function (tournId) {
      // edit selected tournament
    }
  }
}
</script>

<style scoped>
table {
  margin: 7px;
}
</style>
