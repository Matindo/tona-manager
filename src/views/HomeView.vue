<template>
  <div id="home">
    <h2>Open Tournaments</h2>
    <div class="container w-100">
      <div id="tournament-register">
        <p>Create your new tournament here:</p>
        <tournament-form @clickSubmit="createTournament" />
      </div>
      <div id="tournaments-view">
        <div class="table-row" v-for="(tourn, index) in tournaments" :key="index">
          <div class="table-column name">{{ tourn.tournName }}</div>
          <div class="table-column region">{{ tourn.tournPlace }}</div>
          <div class="table-column type">{{ tourn.tournType }}</div>
          <div class="table-column date">{{ tourn.startDate }}</div>
          <div class="table-column actions">
            <b-button variant="outline-info" size="sm" @click="openTournament(tourn.tournName)"><b-icon icon="box-arrow-in-right"></b-icon> Open</b-button>
          </div>
        </div>
      </div>
    </div>
    <!--b-row class="second">
      <h2>Completed Tournaments</h2>
      <div class="container w-100">
        <div class="accordion" role="tablist">
          <tourn-summary v-for="(tourn, index) in completeTournaments" :tournament="tourn" :key="index" />
        </div>
      </div>
    </b-row-->
  </div>
</template>

<script>
// import TournSummary from '@/components/TournSummary.vue'
import TournamentForm from '@/components/TournamentForm.vue'
import { mapGetters } from 'vuex'

export default {
  components: { TournamentForm },
  name: 'GameView',
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      tournaments: 'TOURNAMENTS'
    })
  },
  methods: {
    createTournament: function (tournament) {
      // const formData = new FormData()
      // formData.append('tName', tournament.tournName)
      // formData.append('tLocation', tournament.tournPlace)
      // formData.append('tType', tournament.tournType)
      // formData.append('tDate', tournament.startDate)
      // formData.append('tPrem', tournament.premRounds)
      // formData.append('tKO', tournament.koRounds)
      const t = {}
      t.tournName = tournament.tName
      t.tournPlace = tournament.tPlace
      t.tournType = tournament.tType
      t.koRounds = tournament.koRounds
      t.premRounds = tournament.premRounds
      t.startDate = tournament.start
      t.teams = tournament.teams
      this.$store.dispatch('CREATE_TOURNAMENT', t)
    },
    openTournament: async function (tourn) {
      const currentTournament = this.tournaments.filter(tournament => tournament.tournName === tourn)
      await this.$store.dispatch('SET_TOURNAMENT', currentTournament[0]).then(() => this.$router.push(`/tournament/${tourn.trim().split(' ').join('')}`))
    }
  }
}
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  margin: min(2%, 1.5em) min(4%, 3em);
  padding: 2em;
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
    flex-grow: 1;
    margin-inline: .5rem;
  }
</style>
