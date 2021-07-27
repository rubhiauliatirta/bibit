import axios from "axios"

const omdbAPI = axios.create({
  baseURL: "http://www.omdbapi.com",
})

omdbAPI.interceptors.request.use((config) => {
  config.params['apikey'] = "faf7e5bb"
  return config;
});

omdbAPI.interceptors.response.use(response => {
  if (response.data?.Response === "True") {
    return response.data
  }
  if (response.data?.Response === "False") {
    return Promise.reject(response.data.Response.Error)
  }
  return response
})

export default omdbAPI