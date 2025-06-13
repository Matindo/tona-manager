// To serve team data to the store

import axios from 'axios'
import moment from 'moment'

const API_URL = process.env.API_URL + '/team'
axios.defaults.withCredentials = true


class TeamService {
  async getTeam (id) {
    const response = await axios({
      method: 'GET',
      url: API_URL + `/${id}`
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        return { isError: response.data.error, team: response.data.team }
      }
    }
  }

  async editTeam (team) {
    const formData = new FormData()
    formData.append('teamid', team.id)
    formData.append('tournid', team.tournid)
    formData.append('name', team.name)
    formData.append('region', team.region)
    formData.append('logo', team.logo)
    const response = await axios({
      method: 'PUT',
      url: API_URL + '/updateTeam',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        return { isError: response.data.error, team: response.data.team }
      }
    }
  }

  async addTeamMember (teamId, member) {
    const formData = new FormData()
    formData.append('teamId', teamId)
    formData.append('memberName', member.name)
    formData.append('gender', member.gender)
    formData.append('rep', member.rep)
    formData.append('role', member.role)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/addMember',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        return { isError: response.data.error, message: response.data.message }
      }
    }
  }

  async editTeamMember (teamId, member) {
    const formData = new FormData()
    formData.append('teamId', teamId)
    formData.append('memberId', member.id)
    formData.append('memberName', member.name)
    formData.append('gender', member.gender)
    formData.append('rep', member.rep)
    formData.append('role', member.role)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/editMember',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        return { isError: response.data.error, message: response.data.message }
      }
    }
  }
  async deleteTeamMember (teamId, memberId) {
    const formData = new FormData()
    formData.append('teamId', teamId)
    formData.append('memberId', memberId)
    const response = await axios({
      method: 'DELETE',
      url: API_URL + '/deleteMember',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        return { isError: response.data.error, message: response.data.message }
      }
    }
  }

  async addMemberScore (teamId, memberId, score) {
    const formData = new FormData()
    formData.append('teamId', teamId)
    formData.append('memberId', memberId)
    formData.append('stage', score.stage)
    formData.append('round', score.round)
    formData.append('score', score.score)
    formData.append('timestamp', moment().format('YYYY-MM-DD HH:mm:ss'))
    const response = await axios({
      method: 'POST',
      url: API_URL + '/addMemberScore',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        return { isError: response.data.error, message: response.data.message }
      }
    }
  }

  // async getTeamScores (id) {
  //   const formData = new FormData()
  //   formData.append('id', id)
  //   const response = await axios({
  //     method: 'POST',
  //     url: API_URL + '/getTeamScores',
  //     data: formData,
  //     headers: { 'Content-Type' : 'multipart/form-data' }
  //   })
  //   if (response.status != 200) { return false } else {
  //     if(response.data.error) {
  //       return { isError: response.data.error,  message: response.data.message }
  //     } else {
  //       return { isError: response.data.error, teamScores: response.data.scores }
  //     }
  //   }
  // }

  async getTeamMemberScores (teamId, memberId) {
    const formData = new FormData()
    formData.append('teamId', teamId)
    formData.append('memberId', memberId)
    const response = await axios({
      method: 'POST',
      url: API_URL + '/getMemberScores',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data' }
    })
    if (response.status != 200) { return false } else {
      if(response.data.error) {
        return { isError: response.data.error,  message: response.data.message }
      } else {
        return { isError: response.data.error, memberScores: response.data.scores }
      }
    }
  }
}

export default new TeamService()