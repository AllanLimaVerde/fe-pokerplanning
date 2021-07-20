import axios from 'axios'
import { ROOT_URL } from '../constants'

export const api = axios.create({
  baseURL: ROOT_URL
})

export const updateRoom = async props => {
  try {
    const { data } = await api.post(`/${props.roomName}`, props)
    return data
  } catch (err) {
    throw err
  }
}