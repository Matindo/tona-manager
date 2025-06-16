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
    const response = await axios({
      method: 'GET',
      url: API_URL + `/${id}`,
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
      method: 'PUT',
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
    const response = await axios({
      method: 'GET',
      url: API_URL + `/${id}/getTeams`
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
    formData.append('teamLogo', team.teamLogo)
    formData.append('region', team.region)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/addTeam',
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
      url: API_URL + '/addTeams',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async removeTournamentTeam (team) {
    const formData = new FormData()
    formData.append('tournID', team.tournID)
    formData.append('teamID', team.teamID)
    const response = await axios({
      method: 'DELETE',
      url: API_URL + '/removeTeam',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }

  async startRound (id, stage, round = 1) {
    if (round < 1) { round = 1 }
    const formData = new FormData()
    formData.append('id', id)
    formData.append('round', round)
    formData.append('stage', stage)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/startRound',
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

  async deleteTournament (id) {
    const formData = new FormData()
    formData.append('id', id)
    const response = await axios({
      method: 'DELETE',
      url: API_URL + '/deleteTournament',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status === 200) {
      return { isError: response.data.error,  message: response.data.message }
    } else { return false }
  }
}

export default new TonaService()