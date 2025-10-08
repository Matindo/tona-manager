<template>
  <div id="tournament_view">
    <h3>{{ tournament.name }}</h3>
    <div class="table-row">
      <div class="table-column name">{{ tournament.name }}</div>
      <div class="table-column region">{{ tournament.region }}</div>
      <div class="table-column type">{{ tournament.type }}</div>
      <div class="table-column date">{{ tournament.start_date }}</div>
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
      tournament: 'tona/TOURNAMENT',
      message: 'tona/MESSAGE'
    })
  },
  methods: {
    loadTeams: async function () {
      this.title = 'Load Teams'
      await this.$store.dispatch('tona/fetchTeams') 
    },
    startPrem: function () {
      // ask how many rounds there will be
    },
    popPrem: function () {
      // create a modal to ask if teams aer going to knockout rounds
    }
  },
  watch: {
    message: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.text !== '') {
          this.$bvToast.toast(newVal.text, {
            title: this.title,
            variant: newVal.type,
            autoHideDelay: 5000,
            solid: true,
            appendToast: true
          })
        }
      }
    }
  },
  mounted: async function () {
    this.title = 'Load Tournament'
    this.$bvToast.toast(this.message.text, {
      title: this.title,
      variant: this.message.type,
      autoHideDelay: 5000,
      solid: true,
      appendToast: true
    })
    await this.loadTeams()
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
