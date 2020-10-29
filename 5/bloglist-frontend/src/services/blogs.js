import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const createBlog = async (token, blogItem) => {
  const properToken = `Bearer ${token}`
  const config = {
    headers: { Authorization: properToken }
  }
  console.log(config)
  const response = await axios.post(baseUrl, blogItem, config)
  return response.data
}
export default { getAll, createBlog }
