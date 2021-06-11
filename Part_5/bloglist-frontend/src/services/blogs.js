import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = async payload => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, payload, config)
  return response.data
}

const updateBlog = async payload => {
  const { data, id } = payload
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, data, config)
  return response.data
}

const deleteBlog = async payload => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${payload.id}`, config)
  return response.data
}

export default { getAll, saveBlog, updateBlog, deleteBlog, setToken }