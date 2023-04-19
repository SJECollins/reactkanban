import axios from "axios"

axios.defaults.baseURL = "https://8000-sjecollins-reactkanban-sy790vwiwt9.ws-eu94.gitpod.io/"
axios.defaults.withCredentials = true

export const axiosReq = axios.create()
export const axiosRes = axios.create()
