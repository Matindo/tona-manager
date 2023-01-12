<template>
  <div id="tournament-view">
    <h3> {{ tourn.tournName }} </h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TournamentView',
  data: function () {
    return {
      koVisible: false,
      premVisible: true,
      koTeams: [],
      emptyTournament: { currentRound: 1, tournType: 'PK', stage: 'P', teams: [] }
    }
  },
  computed: {
    ...mapGetters({
      tourn: 'TOURNAMENT'
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
#tournament-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
}
</style>
