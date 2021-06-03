import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_URL}/api/restaurants`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = ({ city = 'merida', username }) => {
  const request = axios.get(`${baseUrl}/${city}/${username}`)
  return request.then(response => response.data)
}

export { getAll, getOne }