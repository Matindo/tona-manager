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
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin: 2em 4em;
  padding: 5em;
  color: hsl(0 1% 14%);
  background-color: hsl(60 56% 91% / .75);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 .5rem .2rem hsl(0 0% 0% / .47);
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  border-radius: 1em;
  overflow: hidden;
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
