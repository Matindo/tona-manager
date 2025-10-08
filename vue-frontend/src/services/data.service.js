// Data handler

import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL + "/data";
// axios.defaults.withCredentials = true

class DataService {
  async getTournaments() {
    if (localStorage.getItem("tournaments")) { localStorage.removeItem("tournaments"); }
    const response = await axios.get(API_URL + "/getTournaments");
    if (response.status != 200) {
      return { isError: true, message: response.statusText + " " + response.data.details}
    } else {
      await localStorage.setItem("tournaments", JSON.stringify(response.data))
      return { isError: false, tourns: response.data }
    }
  }

  async getAllTeams() {
    if (localStorage.getItem("teams")) {
      localStorage.removeItem("teams");
    }
    const response = await axios.get(API_URL + "/getAllTeams");
    if ((response.status != 200) && (response.status!=404)) {
      return { isError: true, message: response.statusText + " " + response.data.details };
    } else {
      if (response.status===404) {
        return { isError: true, message: response.data.details };
      } else {
        await localStorage.setItem("teams", JSON.stringify(response.data))
        return { isError: false, teams: response.data }
      }
    }
  }
}

export default new DataService();
