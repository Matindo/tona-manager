export const canvasMixin = {
  data: function () {
    return {
      ctx: null,
      totalTeams: 0,
      teamWidth: 50,
      teamHeight: 30,
      scoreWidth: 20,
      scoreHeight: 10,
      lineSpan: 10,
      connectors: []
    }
  },
  computed: {
    rounds: function () {
      let matchTeams
      if (this.totalTeams < 3) {
        return 1
      } else if (this.totalTeams < 5) {
        matchTeams = 4
      } else if (this.totalTeams < 9) {
        matchTeams = 8
      } else if (this.totalTeams < 17) {
        matchTeams = 16
      } else if (this.totalTeams < 33) {
        matchTeams = 32
      } else if (this.totalTeams < 65) {
        matchTeams = 64
      } else if (this.totalTeams < 129) {
        matchTeams = 128
      } else {
        matchTeams = 256
      }
      return Math.log2(matchTeams)
    },
    maxRoundTeams: function () {
      return Math.pow(2, (this.rounds - 1))
    },
    maxRoundMatches: function () {
      return this.maxRoundTeams / 2
    },
    round: function () {
      let roundName
      switch (this.rounds) {
        case (1):
          roundName = 'F'
          break
        case (2):
          roundName = 'SF'
          break
        case (3):
          roundName = 'QF'
          break
        case (4):
          roundName = 'R16'
          break
        case (5):
          roundName = 'R32'
          break
        case (6):
          roundName = 'R64'
          break
        case (7):
          roundName = 'R128'
          break
        default:
          roundName = 'R256'
          break
      }
      return roundName
    }
  },
  methods: {
    draw: function () {
      this.ctx = document.getElementById('viewer').getContext('2d')
      const ctx = this.ctx
      ctx.lineCap = 'butt'
      ctx.lineJoin = 'miter'
      ctx.font = '.5rem Times New Roman'
      this.drawQuarterFinals(ctx)
    },
    drawQuarterFinals: function (ctx) {
      this.drawLeftSide()
    },
    drawLine: function (ctx, begin, end, stroke = 'black', width = '1') {
      if (stroke) {
        ctx.strokeStyle = stroke
      }
      if (width) {
        ctx.lineWidth = width
      }
      ctx.beginPath()
      ctx.moveTo(...begin)
      ctx.lineTo(...end)
      ctx.stroke()
    },
    drawSquare: function (ctx, position, size) {
      ctx.strokeRect(position[0], position[1], size, size)
    },
    drawRect: function (ctx, position, size) {
      ctx.strokeRect(position[0], position[1], size[0], size[1])
    },
    addText: function (ctx, text, position) {
      ctx.fillText(text, position[0], position[1])
    },
    drawLeftSide: function () {
      let position
      if (this.connectors.length > 0) {
        const y = this.connectors[0][1] - ((this.teamHeight / 2) + 2)
        position = [this.connectors[0][0], y]
      } else {
        position = [10, 10]
      }
      const sideRounds = this.rounds
      for (var i = 0; i < sideRounds; i++) {
        this.drawRound(this.ctx, position)
        this.totalTeams = this.totalTeams / 2
      }
    },
    drawFinalTeamLeft: function (ctx, position) {
      const pos = [position[0], position[1] - (this.teamHeight / 2)]
      const finalTeamLeft = this.drawObject(ctx, pos)
      this.drawFinalConnector(ctx, finalTeamLeft.connectorPoint)
    },
    drawObject: function (ctx, position, side = 'L', points = 'score') {
      const teamX = position[0]
      const teamY = position[1]
      let scoreX, lineFromX, lineToX
      if (side === 'R') {
        scoreX = teamX - (this.teamWidth + this.scoreWidth)
        lineFromX = scoreX
        lineToX = lineFromX - this.lineSpan
      } else {
        scoreX = teamX + this.teamWidth
        lineFromX = scoreX + this.scoreWidth
        lineToX = lineFromX + this.lineSpan
      }
      const scoreTextX = scoreX + 1
      const scoreY = teamY + ((this.teamHeight - this.scoreHeight) / 2)
      const scoreTextY = scoreY + 7
      const lineY = scoreY + (this.scoreHeight / 2)
      ctx.fillRect(teamX, teamY, this.teamWidth, this.teamHeight)
      this.drawRect(ctx, [scoreX, scoreY], [this.scoreWidth, this.scoreHeight])
      this.addText(ctx, points, [scoreTextX, scoreTextY])
      this.drawLine(ctx, [lineFromX, lineY], [lineToX, lineY])
      const objectDetails = { start: position, end: [teamX, (teamY + this.teamHeight + 2)], connectorPoint: [lineToX, lineY], points: points }
      return objectDetails
    },
    drawConnector: function (ctx, team1ConnectorPoint, team2ConnectorPoint, side = 'L') {
      let lineToX
      const lineFromX = team1ConnectorPoint[0]
      if (side === 'R') {
        lineToX = lineFromX - this.lineSpan
      } else {
        lineToX = lineFromX + this.lineSpan
      }
      const lineY = team1ConnectorPoint[1] + ((team2ConnectorPoint[1] - team1ConnectorPoint[1]) / 2)
      const trunk1Y = team1ConnectorPoint[1]
      const trunk2Y = team2ConnectorPoint[1]
      this.drawLine(ctx, [lineFromX, trunk1Y], [lineFromX, trunk2Y])
      this.drawLine(ctx, [lineFromX, lineY], [lineToX, lineY])
      return [lineToX, lineY]
    },
    drawFinalConnector: function (ctx, point) {
      const line1ToX = point[0] + this.lineSpan
      const line2FromX = line1ToX + this.teamWidth
      const line2ToX = line2FromX + this.lineSpan
      const lineY = point[1]
      const teamWinnerY = lineY - (this.teamHeight / 2) + 8
      const textWinnerX = line1ToX + 1
      const textWinnerY = teamWinnerY - 33
      this.drawLine(ctx, point, [line1ToX, lineY])
      this.drawRect(ctx, [line1ToX, teamWinnerY], [this.teamWidth, this.teamHeight / 2])
      this.drawLine(ctx, [line2FromX, lineY], [line2ToX, lineY])
      this.addText(ctx, 'WINNER', [textWinnerX, textWinnerY])
    },
    drawMatch: function (ctx, position1, position2, side = 'L') {
      let object1, object2, matchConnectorPoint
      if (side === 'R') {
        object1 = this.drawObject(ctx, [position1[0], position1[1] + 2], side)
        object2 = this.drawObject(ctx, [position2[0], position2[1] + 2], side)
        matchConnectorPoint = this.drawConnector(ctx, object1.connectorPoint, object2.connectorPoint, side)
        return { start: position1, end: object2.end, point: matchConnectorPoint }
      }
      object1 = this.drawObject(ctx, [position1[0], position1[1] + 2])
      object2 = this.drawObject(ctx, [position2[0], position2[1] + 2])
      matchConnectorPoint = this.drawConnector(ctx, object1.connectorPoint, object2.connectorPoint)
      return { start: position1, end: object2.end, point: matchConnectorPoint }
    },
    drawRound: function (ctx, position, side = 'L') {
      const matchConnectors = []
      let pos = position
      for (var i = 0; i < this.maxRoundMatches; i++) {
        let pos1, pos2, match
        if (this.connectors.length === 1) {
          this.drawFinalTeamLeft(ctx, [this.connectors[0][0], this.connectors[0][1]])
        } else if (this.connectors.length > 1) {
          const j = i * 2
          pos1 = [this.connectors[j][0], this.connectors[j][1] - (this.teamHeight / 2)]
          pos2 = [this.connectors[j + 1][0], this.connectors[j + 1][1] - (this.teamHeight / 2)]
          if (side === 'R') {
            match = this.drawMatch(ctx, pos1, pos2, 'R')
          } else {
            match = this.drawMatch(ctx, pos1, pos2)
          }
          matchConnectors.push(match.point)
        } else if (this.connectors.length === 0) {
          pos1 = pos
          pos2 = [pos[0], (pos[1] + this.teamHeight + 2)]
          if (side === 'R') {
            match = this.drawMatch(ctx, pos1, pos2, 'R')
          } else {
            match = this.drawMatch(ctx, pos1, pos2)
          }
          pos = match.end
          matchConnectors.push(match.point)
        }
      }
      this.connectors.splice(0, this.connectors.length)
      this.connectors = matchConnectors
    }
  }
}
