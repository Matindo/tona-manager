<template>
  <div id="tournament_view">
    <h3>{{ tournament.tournName }}</h3>
    <div class="table-row">
      <div class="table-column name">{{ tournament.tournName }}</div>
      <div class="table-column region">{{ tournament.tournPlace }}</div>
      <div class="table-column type">{{ tournament.tournType }}</div>
      <div class="table-column date">{{ tournament.startDate }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TournamentView',
  data: function () {
    return {
      title: '',
      koTeams: []
    }
  },
  computed: {
    ...mapGetters({
      tournament: 'TOURNAMENT'
    })
  },
  methods: {
    startPrem: function () {
      // ask how many rounds there will be
    },
    popPrem: function () {
      // create a modal to ask if teams aer going to knockout rounds
    }
  }
}
</script>

<style scoped>
#tournament_view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
}
.table-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.table-column {
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: center;
  margin-inline: .5rem;
}
</style>
