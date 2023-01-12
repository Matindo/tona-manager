<template>
  <b-container>
    <b-row class="main">
      <h2>Open Tournaments</h2>
      <div class="container w-100">
        <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger" content-class="mt-3" align="center" justified>
          <b-tab title="Start New Tournament">
            <b-card-title>Enter the details of your tournament below to begin</b-card-title>
            <b-card-text>
              <tournament-form @clickSubmit="createTournament" />
            </b-card-text>
          </b-tab>
          <b-tab title="Resume Tournament">
            <b-card-title>Chooose from the currently running tournaments to continue</b-card-title>
            <b-card-text>
              <tourn-table title="Open Tournaments" />
            </b-card-text>
          </b-tab>
        </b-tabs>
        <div class="tourns">
          <h3 style="text-align:center;">Tournaments</h3>
          <div class="tournament-choice" v-for="(tourn, index) in tournaments" :key="index">
            <b-button variant="outline-info" size="sm" @click="openTournament(tourn.tournName)">
              <b-icon icon="list-ol"></b-icon> {{tourn.tournName}}
            </b-button>
          </div>
        </div>
      </div>
    </b-row>
    <b-row class="second">
      <h2>Completed Tournaments</h2>
      <div class="container w-100">
        <div class="accordion" role="tablist">
          <tourn-summary v-for="(tourn, index) in completeTournaments" :tournament="tourn" :key="index" />
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import TournTable from '@/components/TournsTable.vue'
import TournSummary from '@/components/TournSummary.vue'
import TournamentForm from '@/components/TournamentForm.vue'
import { mapGetters } from 'vuex'

export default {
  components: { TournTable, TournSummary, TournamentForm },
  name: 'GameView',
  data: function () {
    return {
      completeTournaments: [
      ],
      runningTournaments: [],
      counter: 0
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
      this.$store.dispatch('CREATE_TOURNAMENT', tournament)
    },
    openTournament: async function (tourn) {
      await this.$store.dispatch('SET_TOURNAMENT', this.tournaments.filter(tournament => tournament.tournName === tourn))
      this.$router.push(`/tournament/${tourn.trim().split(' ').join('')}`)
    }
  }
}
</script>

<style scoped lang="scss">
.second {
  display: flex;
  flex-direction: column;
  padding: 1em;
  .container {
    padding: 7px;
  }
}
</style>
