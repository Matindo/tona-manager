<template>
  <div id="home">
    <h2>Open Tournaments</h2>
    <div class="container w-100">
      <div id="tournament-register">
        <p>Create your new tournament here:</p>
        <tournament-form @clickSubmit="createTournament" />
      </div>
      <div id="tournaments-view">
        <h4>Ongoing Tournaments</h4>
        <div class="table-row header">
          <div class="table-column name">Tournament Name</div>
          <div class="table-column region">Region</div>
          <div class="table-column type">Type</div>
          <div class="table-column date">Start Date</div>
          <div class="table-column actions">Actions</div>
        </div>
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
      const tourn = {}
      tourn.tournName = tournament.tName
      tourn.tournPlace = tournament.tPlace
      tourn.tournType = tournament.tType
      tourn.startDate = tournament.start
      tourn.status = 'created'
      this.$store.dispatch('CREATE_TOURNAMENT', tourn)
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
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: .6rem;
  &.header {
    font-weight: bold;
    background-color: hsla(0, 0%, 0%, 0.234);
  }
}
.table-column {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  margin-inline: .5rem;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */
  &.name, &.region {
    justify-content: flex-start;
  }
}
</style>
