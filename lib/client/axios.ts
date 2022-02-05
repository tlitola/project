import axios from 'axios'

export const axiosWithApi = axios.create({
  baseURL: process.env.API_base_url,
  headers: {
    'x-api-key': process.env.API_key as string,
  },
})
