import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_URL}/api/login`

const Login = async ({ username, password }) => {
  try {
    const request = await axios.post(`${baseUrl}`, { username, password })
    return request

  } catch (error) {
    console.log(error)
  }

}

export default Login


