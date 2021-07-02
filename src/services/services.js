import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_URL}/api/services`

const onCreateService = async (service) => {
  try {
    const resp = await axios.post(`${baseUrl}`, { service }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      }
    })
    console.log(resp)
    return resp

  } catch (error) {
    return error.response
  }
}

const onEditService = async (service) => {
  try {
    const resp = await axios.put(`${baseUrl}`, { service }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      }
    })
    console.log(resp)
    return resp

  } catch (error) {
    console.log(error)
  }
}

const onDeleteService = async (service) => {
  try {
    const response = await axios.delete(`${baseUrl}`, {
      data: { service },
      headers: {
        authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      }
    })
    return response

  } catch (error) {
    console.log(error)
  }

}

/* const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
*/
const getOne = ({ city = 'merida', username }) => {
  const request = axios.get(`${baseUrl}/${city}/${username}`)
  return request.then(response => response.data)
}



export { onEditService, getOne, onDeleteService, onCreateService }