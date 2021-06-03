import { useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from 'contexts/AuthContext'

const baseUrl = `${process.env.REACT_APP_URL}/api/restaurants`

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const useIsLogin = () => {
  const { userActual, dispatch } = useContext(AuthContext)
  useEffect(() => {
    const getOne = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/merida/${localStorage.getItem("adminUsername")}`)
        const { services, ...rest } = data
        dispatch({
          type: "SET_USER",
          payload: rest,
        });
        dispatch({
          type: "SET_SERVICES",
          payload: services
        })
      } catch (error) {
        console.log(error)
        /* if (error && error.response.status === 401 && !!localStorage.getItem("adminToken")) {
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUsername')
        } */
      }
    }
    if (!!localStorage.getItem("adminToken") && !userActual?._id && typeof dispatch === 'function') {
      getOne();
    }
    return () => !!userActual && source.cancel()
  }, [dispatch, userActual]);
}

export default useIsLogin