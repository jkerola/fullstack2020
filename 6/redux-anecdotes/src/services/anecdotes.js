import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (anecdoteObject) => {
  const response = await axios.post(baseURL, anecdoteObject)
  return response.data
}

const modifyItem = async (anecdoteObject) => {
  const url = baseURL + '/' + anecdoteObject.id
  const response = await axios.put(url, anecdoteObject)
  return response.data
}
export default { getAll, createNew, modifyItem }
