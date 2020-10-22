import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getTrades() {
    return apiClient.get("/trades");
  },
  submitTrade(form) {
    return apiClient.post("/trades", form);
  },
  saveTrade(form) {
    return apiClient.post("/drafts", form);
  }
};
