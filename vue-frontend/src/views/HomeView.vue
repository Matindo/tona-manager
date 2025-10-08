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
          <div class="table-column date">Status</div>
          <div class="table-column actions">Actions</div>
        </div>
        <div class="table-row" v-for="(tourn, index) in tournaments" :key="index" :class="index % 2 === 1 ? 'tr-dark' : 'tr-light'">
          <div class="table-column name">{{ tourn.name }}</div>
          <div class="table-column region">{{ tourn.region }}</div>
          <div class="table-column type">{{ showFullType(tourn.type) }}</div>
          <div class="table-column date">{{ tourn.status }}</div>
          <div class="table-column actions">
            <b-button variant="outline-info" size="sm" @click="openTournament(tourn.tournament_id)"><b-icon icon="box-arrow-in-right"></b-icon> Open</b-button>
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
      tournaments: 'TOURNAMENTS',
      tona_messages: 'tona/MESSAGE'
    })
  },
  methods: {
    createTournament: async function (tournament) {
      const tourn = {}
      tourn.name = tournament.tName
      tourn.region = tournament.tPlace
      tourn.type = tournament.tType
      tourn.start_date = new Date(tournament.start).toISOString().replace("T", " ").substring(0, 19)
      await this.$store.dispatch('tona/createTona', tourn)
      this.$bvToast.toast(this.tona_messages.text, {
        title: 'Tournament Creation',
        variant: this.tona_messages.type,
        autoHideDelay: 5000,
        solid: true,
        appendToast: true
      })
      await this.$store.dispatch('REFRESH_DATA')
    },
    openTournament: async function (tourn) {
      const currentTournament = this.tournaments.filter(tournament => tournament.tournament_id === tourn)
      if (currentTournament.length === 0) {
        this.$bvToast.toast("Tournament not found", {
          title: 'Open Tournament',
          variant: 'danger',
          autoHideDelay: 5000,
          solid: true,
          appendToast: true
        })
        return
      } else {
        const tourn_id = currentTournament[0].tournament_id
        await this.$store.dispatch('tona/setTona', tourn_id)
        this.$router.push(`/tournament/${tourn_id}`)
      }
    },
    showFullType: function (tourn_type) {
      let ttype = null
      switch (tourn_type) {
        case "P":
          ttype = "Preliminaries Only"
          break
        case "K":
          ttype = "Knock-outs Only"
          break
        default:
          ttype = "Prelims then Knock-outs"
          break
      }
      return ttype
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
  margin-bottom: .4rem;
  &.header {
    font-weight: bold;
    background-color: hsla(228, 90%, 25%, 0.775);
    color: aliceblue;
  }
  &.tr-dark {
    background-color: hsla(0, 0%, 0%, 0.1);
    padding-block: .4rem;
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
