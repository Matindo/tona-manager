// To serve tournament data to the store

import axios from 'axios'
import moment from 'moment'

const API_URL = process.env.API_URL + '/tona'
axios.defaults.withCredentials = true


class TonaService {
  async getTournaments () {
    if (localStorage.getItem('tournaments')) { localStorage.removeItem('tournaments') }
    const response = await axios.get(API_URL + '/getTournaments')
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        await localStorage.setItem('tournaments', JSON.stringify(response.data.tournaments))
        return { isError: response.data.error, tourns: response.data.tournaments }
      }
    }
  }

  async getTournament (id) {
    if (localStorage.getItem('tournament')) { localStorage.removeItem('tournament') }
    const formData = new FormData()
    formData.append('id', id)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/getTournament',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        await localStorage.setItem('tournament', JSON.stringify(response.data.tournament))
        return { isError: response.data.error, tourn: response.data.tournament }
      }
    }
  }

  async addTournament (tourn) {
    const formData = new FormData()
    formData.append('tournName', tourn.tournName)
    formData.append('tournPlace', tourn.tournPlace)
    formData.append('tournType', tourn.tournType)
    formData.append('startDate', tourn.startDate)
    formData.append('tournStatus', tourn.status)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/addTournament',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async editTournament (tourn) {
    const formData = new FormData()
    formData.append('id', tourn.id)
    formData.append('tournName', tourn.tournName)
    formData.append('tournPlace', tourn.tournPlace)
    formData.append('tournType', tourn.tournType)
    formData.append('startDate', tourn.startDate)
    formData.append('tournStatus', tourn.status)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/editTournament',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async getTournamentTeams (id) {
    if (localStorage.getItem('tournamentTeams')) { localStorage.removeItem('tournamentTeams') }
    const formData = new FormData()
    formData.append('id', id)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/getTournamentTeams',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        await localStorage.setItem('tournamentTeams', JSON.stringify(response.data.teams))
        return { isError: response.data.error, teams: response.data.teams }
      }
    }
  }

  async addTournamentTeam (team) {
    const formData = new FormData()
    formData.append('tournID', team.tournID)
    formData.append('teamName', team.teamName)
    formData.append('teamCaptain', team.teamCaptain)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/addTournamentTeam',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async addTournamentTeams (teams) {
    const formData = new FormData()
    formData.append('tournID', teams.tournID)
    formData.append('teams', JSON.stringify(teams.teams))
    const response = await axios({
      method: 'POST',
      url: API_URL + '/addTournamentTeams',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async startPreliminaryRound (id, round = 1) {
    if (round < 1) { round = 1 }
    const formData = new FormData()
    formData.append('id', id)
    formData.append('round', round)
    formData.append('timestamp', moment().format('YYYY-MM-DD HH:mm:ss'))
    const response = await axios({
      method: 'POST',
      url: API_URL + '/startPreliminaryRound',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async startKnockoutRound (id, round) {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('round', round)
    formData.append('timestamp', moment().format('YYYY-MM-DD HH:mm:ss'))
    const response = await axios({
      method: 'POST',
      url: API_URL + '/startKnockoutRound',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async endRound (id) {
    const formData = new FormData()
    formData.append('id', id)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/endRound',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async endTournament (id) {
    const formData = new FormData()
    formData.append('id', id)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/endTournament',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }
}

export default new TonaService()