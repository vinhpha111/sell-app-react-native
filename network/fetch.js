import { API_URL } from "@env"
import * as SecureStore from 'expo-secure-store';

export default async function fetchCustom(url, option = {}) {
  url = API_URL + '/' + url
  console.log(url)
  let token = await SecureStore.getItemAsync('token')
  option.headers = option.headers || {}
  option.headers.Authorization = "Bearer " + token
  option.headers['X-Requested-With'] = 'XMLHttpRequest'
  option.headers['Content-Type'] = 'application/json'
  option.headers['Accept'] = 'application/json'
  return fetch(url, option)
}