import axios from "axios"

axios.defaults.baseURL = 'https://cimoments.herokuapp.com/'
axios.defaults.withCredentials = true

export const axiosReq = axios.create()
export const axiosRes = axios.create()