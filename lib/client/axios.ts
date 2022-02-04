import axios from 'axios'

export const axiosWithApi = axios.create({
  baseURL: 'https://localhost:3000/api',
  headers: {
    'x-api-key': process.env.API_key as string,
  },
})
