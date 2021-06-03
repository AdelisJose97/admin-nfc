
import React, { createContext, useReducer, useEffect } from 'react'


import useIsLogin from 'hooks/useIsLogin'

const initialValues = {
  userActual: {},
  services: []
}

export const AuthContext = createContext(initialValues)
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userActual: action.payload }
    case "SET_SERVICES":
      return { ...state, services: action.payload }
    case "ADD_SERVICE":
      return { ...state, services: state.services.concat(action.payload) }
    case "DELETE_SERVICE":
      return { ...state, services: state.services.filter(service => service._id !== action.payload) }
    default:
      return state;
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { userActual } = state;
  useIsLogin()
  useEffect(() => {

  }, [userActual])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContextProvider

/* export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { userActual } = state;
  useEffect(() => {
    getAllUsers()
      .then(result => {
        console.log(result);
        if (result) {
          dispatch({
            type: "SET_ALL_USERS",
            payload: result
          })
          dispatch({
            type: "SET_SHOW_DIALOG",
            payload: false
          })

        }
      })
    getTopRanking()
      .then(result => {
        dispatch({
          type: "SET_TOP_RANKING_USERS",
          payload: result
        })
        dispatch({
          type: "SET_SHOW_DIALOG",
          payload: false
        })
      })

    return () => {

    }
  }, [userActual])
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

 */

/* const reducer = (state, action) => {
 switch (action.type) {
   case "SET_ACTUAL_USER":
     return { ...state, userActual: action.payload }
   case "SET_ALL_USERS":
     return { ...state, allUsers: action.payload };
   case "SET_TOP_RANKING_USERS":
     return { ...state, TopRankingUsers: action.payload }
   case "DELETE_USER":
     return { ...state, allUsers: { ...state.allUsers, docs: state.allUsers.docs.filter(item => item._id != action.payload) } }
   case "SET_WITHDRAWAL_HISTORY":
     return { ...state, withdrawalHistory: action.payload }
   case "GET_RECENT_USERS":
     return { ...state, RecentUsers: action.payload }
   case "GET_REVENUE_DAY":
     return { ...state, RevenueDay: action.payload }
   case "SET_SHOW_DIALOG":
     return { ...state, showLoading: action.payload }
   default:
     return state;
 }
} */