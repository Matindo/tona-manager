<template>
  <div class="knock-outs">
    <div class="navigator">
      <b-button pill variant="outline-success" @click="finishCompetition()" v-show="isComplete">{{ isComplete ? 'Show Winner' : 'Start Round'}}</b-button>
      <b-button pill variant="outline-primary" @click="saveRound()" :disabled="roundFinished" v-show="!isComplete">Show Results</b-button>
      <b-button pill variant="outline-warning" @click="finishRound()" :disabled="!roundFinished" v-show="!isComplete">Finish Round</b-button>
    </div>
    <b-button block variant="outline-danger" @click="endCompetition()" v-if="showEnd">End Competition</b-button>
    <div class="canvas">
      <canvas id="viewer"></canvas>
    </div>
  </div>
</template>

<script>
import { canvasMixin } from '@/mixins/canvasMixin'
export default {
  name: 'KnockOuts',
  mixins: [canvasMixin],
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      round: 0,
      winner: null,
      showEnd: false,
      rightTeams: [],
      leftTeams: [],
      matches: [],
      teamsy: [
        { id: '1', name: 'team 1', points: 1, imagePosition: null, scorePosition: null },
        { id: '2', name: 'team 2', points: 2, imagePosition: null, scorePosition: null },
        { id: '3', name: 'team 3', points: 3, imagePosition: null, scorePosition: null },
        { id: '4', name: 'team 4', points: 4, imagePosition: null, scorePosition: null },
        { id: '5', name: 'team 5', points: 5, imagePosition: null, scorePosition: null },
        { id: '6', name: 'team 6', points: 6, imagePosition: null, scorePosition: null },
        { id: '7', name: 'team 7', points: 7, imagePosition: null, scorePosition: null },
        { id: '8', name: 'team 8', points: 8, imagePosition: null, scorePosition: null },
        { id: '9', name: 'team 9', points: 9, imagePosition: null, scorePosition: null },
        { id: '10', name: 'team 10', points: 10, imagePosition: null, scorePosition: null },
        { id: '11', name: 'team 11', points: 11, imagePosition: null, scorePosition: null },
        { id: '12', name: 'team 12', points: 12, imagePosition: null, scorePosition: null },
        { id: '13', name: 'team 13', points: 13, imagePosition: null, scorePosition: null },
        { id: '14', name: 'team 14', points: 14, imagePosition: null, scorePosition: null },
        { id: '15', name: 'team 15', points: 15, imagePosition: null, scorePosition: null },
        { id: '16', name: 'team 16', points: 16, imagePosition: null, scorePosition: null }
      ]
    }
  },
  computed: {
    isComplete: function () {
      if (this.round < 1) {
        return true
      } else {
        return false
      }
    },
    roundFinished: function () {
      const noWinner = []
      for (var i = 0; i < this.matches.length; i++) {
        if (this.matches[i].winner === null) {
          noWinner.push(this.matches.id)
        }
      }
      if (noWinner.length > 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    initializeCanvas: function () {
      this.totalTeams = this.teamsy.length
      this.draw()
    },
    randomizeTeams: function () {
      const randomTeams = this.teamsy
      this.splitTeams(randomTeams)
    },
    makeMatch: function (team1, team2, identifier) {
      const prop = team1
      const opp = team2
      const match = { id: identifier, proposers: prop, opposers: opp, winner: null, completed: false }
      const ctx = this.ctx
      this.addText(ctx, prop.name, prop.imagePosition)
      this.addText(ctx, opp.name, opp.imagePosition)
      this.matches.push(match)
    },
    FillRound: function (round) {
      if (round > 1) {
        const matches = this.teamsy.length / 4
        let i, j
        let count = 1
        for (i = 0; i < matches; i++) {
          j = i * 2
          const team1 = this.leftTeams[j]
          const team2 = this.leftTeams[j + 1]
          team1.imagePosition = this.leftCoordinates[j].imagePoint
          team1.scorePosition = this.leftCoordinates[j].scorePoint
          team2.imagePosition = this.leftCoordinates[j + 1].imagePoint
          team2.scorePosition = this.leftCoordinates[j + 1].scorePoint
          this.makeMatch(team1, team2, round + '' + count)
          count += 1
        }
        for (i = 0; i < matches; i++) {
          j = i * 2
          const team1 = this.rightTeams[j]
          const team2 = this.rightTeams[j + 1]
          team1.imagePosition = this.rightCoordinates[j].imagePoint
          team1.scorePosition = this.rightCoordinates[j].scorePoint
          team2.imagePosition = this.rightCoordinates[j + 1].imagePoint
          team2.scorePosition = this.rightCoordinates[j + 1].scorePoint
          this.makeMatch(team1, team2, round + '' + count)
          count += 1
        }
        this.leftCoordinates.splice(0, matches * 2)
        this.rightCoordinates.splice(0, matches * 2)
      } else {
        const team1 = this.rightTeams[0]
        const team2 = this.leftTeams[0]
        team1.imagePosition = this.rightCoordinates[this.rightCoordinates.length - 1].imagePoint
        team1.scorePosition = this.rightCoordinates[this.rightCoordinates.length - 1].scorePoint
        team2.imagePosition = this.leftCoordinates[this.leftCoordinates.length - 1].imagePoint
        team2.scorePosition = this.leftCoordinates[this.leftCoordinates.length - 1].scorePoint
        this.makeMatch(team1, team2, 'final')
      }
    },
    startRound: function () {
      this.round = Math.log2(this.teamsy.length)
      this.FillRound(this.round)
      this.teamsy.splice(0, this.teamsy.length)
    },
    saveRound: function () {
      for (var i = 0; i < this.matches.length; i++) {
        if (this.matches[i].proposers.points && this.matches[i].opposers.points) {
          this.addText(this.ctx, this.matches[i].proposers.points, this.matches[i].proposers.scorePosition)
          this.addText(this.ctx, this.matches[i].opposers.points, this.matches[i].opposers.scorePosition)
          this.matches[i].completed = true
          if (this.matches[i].completed) {
            this.matches[i].winner = this.getWinner(this.matches[i].proposers, this.matches[i].opposers)
            this.teamsy.push(this.matches[i].winner)
          }
        }
      }
    },
    finishRound: function () {
      this.leftTeams.splice(0, this.leftTeams.length)
      this.rightTeams.splice(0, this.rightTeams.length)
      this.matches.splice(0, this.matches.length)
      this.round = this.round - 1
      this.splitTeams(this.teamsy)
      if (this.round > 0) {
        this.startRound()
      }
    },
    finishCompetition: function () {
      this.winner = this.teamsy[0]
      this.addText(this.ctx, 'chicken', this.winnerCoordinates.imagePoint)
      this.addText(this.ctx, this.teamsy[0].name, this.winnerCoordinates.namePoint)
      this.leftTeams = []
      this.rightTeams = []
      this.teamsy = []
      this.showEnd = true
    },
    getWinner: function (team1, team2) {
      if (team2.points > team1.points) {
        return team2
      } else if (team1.points > team2.points) {
        return team1
      } else {
        return 'draw'
      }
    },
    splitTeams: function (teams) {
      let i
      for (i = 0; i < teams.length / 2; i++) {
        this.leftTeams.push(teams[i])
      }
      for (i = teams.length / 2; i < teams.length; i++) {
        this.rightTeams.push(teams[i])
      }
    },
    endCompetition: function () {
      this.$store.dispatch('END_TOURNAMENT').then(() => {
        this.$router.go(-1)
      })
    }
  },
  mounted: function () {
    this.initializeCanvas()
    this.randomizeTeams()
    this.startRound()
  }
}
</script>

<style scoped>
.knock-outs {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
}
.navigator {
  display: inline-flex;
  justify-content: space-around;
  align-content: center;
  width: 100%;
  margin-bottom: .5rem;
}
.canvas {
  width: 100%;
  border: .1px solid rgb(177, 176, 176);
  display: block;
  overflow: auto;
}
</style>
