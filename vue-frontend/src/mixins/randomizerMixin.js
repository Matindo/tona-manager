import { mapGetters } from 'vuex'

export const randomizerMixin = {
  data: function () {
    return {
      round1: [],
      round2: [],
      round3: [],
      allRounds: [],
      totalRounds: 3
    }
  },
  computed: {
    ...mapGetters({
      teams: 'TEAMS'
    })
  },
  methods: {
    randomizeTeams: function (teams) {
      // Fisher-Yates algorithm
      var currentIndex = teams.length
      var temporaryValue
      var randomIndex
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = teams[currentIndex]
        teams[currentIndex] = teams[randomIndex]
        teams[randomIndex] = temporaryValue
      }
      return teams
    },
    pairTeams: function (teams) {
      const matches = []
      for (var i = 0; i < teams.length; i + 2) {
        const match = { prop: teams[i], opp: teams[i + 1] }
        matches.push(match)
      }
      return matches
    },
    threeRoundPreliminaries: function () {
      const random1 = this.randomizeTeams(this.teams)
      const random2 = this.randomizeTeams(random1)
      const random3 = this.randomizeTeams(random2)
      this.round1 = this.pairTeams(random1)
      this.round2 = this.pairTeams(random2)
      this.round3 = this.pairTeams(random3)
    },
    leaguePreliminaries: function () {
      /** for (let r = startingRound; r < startingRound + playerArray.length - 1; r++) {
        let round = [];
        for (let i = 0; i < playerArray.length / 2; i++) {
            round.push({
                round: r,
                match: i + 1,
                player1: null,
                player2: null
            });
        }
        if (r === startingRound) {
            round.forEach((m, i) => {
                m.player1 = playerArray[i];
                m.player2 = playerArray[playerArray.length - i - 1];
            });
        } else {
            const prevRound = matches.filter(m => m.round === r - 1);
            const indexFind = idx => {
                if (idx + (playerArray.length / 2) > playerArray.length - 2) {
                    return idx + 1 - (playerArray.length / 2);
                } else {
                    return idx + (playerArray.length / 2);
                }
            }
            for (let i = 0; i < round.length; i++) {
                const prev = prevRound[i];
                const curr = round[i];
                if (i === 0) {
                    if (prev.player2 === playerArray[playerArray.length - 1]) {
                        curr.player1 = playerArray[playerArray.length - 1];
                        curr.player2 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player1))];
                    } else {
                        curr.player2 = playerArray[playerArray.length - 1];
                        curr.player1 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player2))];
                    }
                } else {
                    curr.player1 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player1))];
                    curr.player2 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player2))];
                }
            }
        }
        matches = [...matches, ...round];
    } **/
    }
  }
}
