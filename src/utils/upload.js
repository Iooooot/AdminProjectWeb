import axios from 'axios'
import { getToken } from '@/utils/auth'

export function upload(api, file) {
  var data = new FormData()
  data.append('file', file)
  const config = {
    headers: { 'token': getToken() }
  }
  return axios.post(api, data, config)
}
