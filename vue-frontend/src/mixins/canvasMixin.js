export const canvasMixin = {
  data: function () {
    return {
      ctx: null,
      canvasWidth: 0,
      canvasHeight: 0,
      totalTeams: 0,
      tempTeams: 0,
      teamWidth: 90,
      teamHeight: 70,
      scoreWidth: 30,
      scoreHeight: 20,
      lineSpan: 10,
      connectors: [],
      leftCoordinates: [],
      rightCoordinates: [],
      winnerCoordinates: { imagePoint: [], namePoint: [] }
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
    }
  },
  methods: {
    setSize: function (canvas) {
      this.canvasWidth = ((((this.teamWidth + this.scoreWidth + this.lineSpan) * this.rounds) + (this.lineSpan * (this.rounds - 1))) * 2) + ((this.lineSpan * 2) + this.teamWidth) + 20
      this.canvasHeight = (this.maxRoundMatches * ((this.teamHeight * 2) + 6)) + 25
      canvas.height = this.canvasHeight
      canvas.width = this.canvasWidth
    },
    draw: function () {
      const canvas = document.getElementById('viewer')
      this.setSize(canvas)
      this.ctx = canvas.getContext('2d')
      const ctx = this.ctx
      ctx.lineCap = 'butt'
      ctx.lineJoin = 'miter'
      ctx.font = '.8rem Times New Roman'
      this.drawLeftSide()
      this.drawRightSide()
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
    drawObject: function (ctx, position, side = 'L') {
      let teamX
      const teamY = position[1]
      let scoreX, lineFromX, lineToX
      if (side === 'R') {
        teamX = position[0] - this.teamWidth
        scoreX = teamX - this.scoreWidth
        lineFromX = scoreX
        lineToX = lineFromX - this.lineSpan
      } else {
        teamX = position[0]
        scoreX = teamX + this.teamWidth
        lineFromX = scoreX + this.scoreWidth
        lineToX = lineFromX + this.lineSpan
      }
      const scoreTextX = scoreX + 1
      const scoreY = teamY + ((this.teamHeight - this.scoreHeight) / 2)
      const scoreTextY = scoreY + (0.7 * this.scoreHeight)
      const lineY = scoreY + (this.scoreHeight / 2)
      this.drawRect(ctx, [teamX, teamY], [this.teamWidth, this.teamHeight])
      this.drawRect(ctx, [scoreX, scoreY], [this.scoreWidth, this.scoreHeight])
      this.drawLine(ctx, [lineFromX, lineY], [lineToX, lineY])
      const objectDetails = { start: position, end: [teamX, (teamY + this.teamHeight + 2)], connectorPoint: [lineToX, lineY] }
      if (side === 'R') {
        this.rightCoordinates.push({ imagePoint: [(position[0] - this.teamWidth + 1), (position[1] + 1)], scorePoint: [scoreTextX, scoreTextY] })
      } else {
        this.leftCoordinates.push({ imagePoint: [(position[0] + 1), (position[1] + 1)], scorePoint: [scoreTextX, scoreTextY] })
      }
      return objectDetails
    },
    drawFinalTeam: function (ctx, position, side = 'L') {
      const pos = [position[0], position[1] - (this.teamHeight / 2)]
      if (side === 'R') {
        this.drawObject(ctx, pos, 'R')
      } else {
        const finalTeamLeft = this.drawObject(ctx, pos)
        this.drawFinalConnector(ctx, finalTeamLeft.connectorPoint)
      }
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
      const teamWinnerY = lineY - (this.teamHeight / 2) + 17
      const textWinnerX = line1ToX + 15
      const textWinnerY = teamWinnerY - 13
      this.drawLine(ctx, point, [line1ToX, lineY])
      this.drawRect(ctx, [line1ToX, teamWinnerY], [this.teamWidth, this.teamHeight / 2])
      this.winnerCoordinates.imagePoint[0] = line1ToX + 1
      this.winnerCoordinates.imagePoint[1] = teamWinnerY + 1
      this.winnerCoordinates.namePoint[0] = line1ToX + (this.teamWidth / 4)
      this.winnerCoordinates.namePoint[1] = teamWinnerY + (this.teamHeight / 2) + 7
      this.drawLine(ctx, [line2FromX, lineY], [line2ToX, lineY])
      this.addText(ctx, 'WINNER', [textWinnerX, textWinnerY])
    },
    drawMatch: function (ctx, position1, position2, side = 'L') {
      let object1, object2, matchConnectorPoint
      if (side === 'R') {
        object1 = this.drawObject(ctx, [position1[0], position1[1] + 2], side)
        object2 = this.drawObject(ctx, [position2[0], position2[1] + 2], side)
        matchConnectorPoint = this.drawConnector(ctx, object1.connectorPoint, object2.connectorPoint, side)
        return { start: position1, end: [object2.end[0] + this.teamWidth, object2.end[1]], point: matchConnectorPoint }
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
          if (side === 'R') {
            this.drawFinalTeam(ctx, [this.connectors[0][0], this.connectors[0][1]], 'R')
          } else {
            this.drawFinalTeam(ctx, [this.connectors[0][0], this.connectors[0][1]])
          }
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
    },
    drawLeftSide: function () {
      let position
      this.tempTeams = this.totalTeams
      if (this.connectors.length > 0) {
        const y = this.connectors[0][1] - ((this.teamHeight / 2) + 2)
        position = [this.connectors[0][0], y]
      } else {
        position = [10, 22]
      }
      for (var sideRounds = this.rounds; sideRounds > 0; sideRounds--) {
        this.drawRound(this.ctx, position)
        this.totalTeams = this.totalTeams / 2
      }
    },
    drawRightSide: function () {
      let position
      this.totalTeams = this.tempTeams
      if (this.connectors.length > 0) {
        const y = this.connectors[0][1] - ((this.teamHeight / 2) + 2)
        position = [this.connectors[0][0], y]
      } else {
        position = [(this.canvasWidth - 10), 22]
      }
      for (var sideRounds = this.rounds; sideRounds > 0; sideRounds--) {
        this.drawRound(this.ctx, position, 'R')
        this.totalTeams = this.totalTeams / 2
      }
    }
  }
}
