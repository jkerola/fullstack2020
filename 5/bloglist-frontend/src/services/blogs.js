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
  const response = await axios.post(baseUrl, blogItem, config)
  return response.data
}
const likeBlog = async (token, blogItem) => {
  const properToken = `Bearer ${token}`
  const config = {
    headers: { Authorization: properToken }
  }
  const blogURL = baseUrl + '/' + blogItem.id
  const response = await axios.put(blogURL, blogItem, config)
  return response.data
}
const deleteBlog = async (token, blogItem) => {
  const properToken = `Bearer ${token}`
  const config = {
    headers: { Authorization: properToken }
  }
  const blogURL = baseUrl + '/' + blogItem.id
  const response = await axios.delete(blogURL, config)
  return response.data
}
export default { getAll, createBlog, likeBlog, deleteBlog }
