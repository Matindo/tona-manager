// To serve tournament data to the store

import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL + "/tona";
// axios.defaults.withCredentials = true
axios.defaults.validateStatus = function () { return true }

class TonaService {
  async getTournament(id) {
    if (localStorage.getItem("tournament")) {
      localStorage.removeItem("tournament");
    }
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("response", response);
    if (response.status === 200) {
      localStorage.setItem("tournament", JSON.stringify(response.data));
      return { isError: false, tourn: response.data };
    } else {
      return { isError: true, message: response.data.detail };
    }
  }

  async addTournament(tourn) {
    const response = await axios({
      method: "POST",
      url: API_URL + "/addTournament",
      data: JSON.stringify(tourn),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      const tourns = JSON.parse(localStorage.getItem("tournaments"));
      tourns.push(response.data);
      localStorage.setItem("tournaments", JSON.stringify(tourns));
      return {
        isError: false,
        message: response.statusText,
        tournament: response.data,
      };
    } else {
      return {
        isError: true,
        message: response.statusText + " " + response.data.detail,
      };
    }
  }

  async editTournament(tourn) {
    const formData = new FormData();
    formData.append("tournament", tourn);
    // formData.append('tournName', tourn.tournName)
    // formData.append('tournPlace', tourn.tournPlace)
    // formData.append('tournType', tourn.tournType)
    // formData.append('startDate', tourn.startDate)
    // formData.append('tournStatus', tourn.status)
    const response = await axios({
      method: "PUT",
      url: API_URL + "/editTournament",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }

  async getTournamentTeams(id) {
    if (localStorage.getItem("tournamentTeams")) {
      localStorage.removeItem("tournamentTeams");
    }
    const response = await axios({
      method: "GET",
      url: API_URL + `/${id}/getTeams`
    })
    console.log("get teams response", response)
    if (response.status !== 200) {
      return { isError: true, message: response.data.detail }
    } else {
      return { isError: false, teams: response.data.teams }
    }
  }

  async addTournamentTeam(tournID, team) {
    const formData = new FormData();
    formData.append("tournament_id", tournID);
    formData.append("team", team);
    const response = await axios({
      method: "POST",
      url: API_URL + "/addTeam",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }

  async addTournamentTeams(tournID, teams) {
    const formData = new FormData();
    formData.append("tournament_id", tournID);
    formData.append("teams", JSON.stringify(teams.teams));
    const response = await axios({
      method: "POST",
      url: API_URL + "/addTeams",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }

  async removeTournamentTeam(team) {
    const formData = new FormData();
    formData.append("tournID", team.tournID);
    formData.append("teamID", team.teamID);
    const response = await axios({
      method: "DELETE",
      url: API_URL + "/removeTeam",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }

  async startRound(id, stage, round = 1) {
    if (round < 1) {
      round = 1;
    }
    const formData = new FormData();
    formData.append("id", id);
    formData.append("round", round);
    formData.append("stage", stage);
    const response = await axios({
      method: "POST",
      url: API_URL + "/startRound",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }

  async endRound(id) {
    const formData = new FormData();
    formData.append("id", id);
    const response = await axios({
      method: "POST",
      url: API_URL + "/endRound",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }

  async endTournament(id) {
    const formData = new FormData();
    formData.append("id", id);
    const response = await axios({
      method: "POST",
      url: API_URL + "/endTournament",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }

  async deleteTournament(id) {
    const formData = new FormData();
    formData.append("id", id);
    const response = await axios({
      method: "DELETE",
      url: API_URL + "/deleteTournament",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { isError: response.data.error, message: response.data.message };
    } else {
      return false;
    }
  }
}

export default new TonaService();
