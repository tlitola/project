import axios from 'axios'

export const axiosWithApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_base_url,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_key as string,
  },
})
