
import React, { createContext, useReducer, useEffect } from 'react'


import useIsLogin from 'hooks/useIsLogin'

const initialValues = {
  userActual: {},
  services: [],
  showLoading: false
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
    case "EDIT_SERVICE":
      return {
        ...state, services: state.services.map(service => {
          if (service._id === action.payload._id) {
            service.name = action.payload.name
            service.start_end = action.payload.start_end
          }
          return service
        })
      }
    case "ADD_CATEGORY":
      return {
        ...state, services: state.services.map(service => {
          if (service._id === action.payload.serviceId) {
            service.categories = [...service.categories, action.payload.category]
          }
          return service
        })
      }
    case "DELETE_CATEGORY":
      return {
        ...state, services: state.services.map(service => {
          if (service._id === action.payload.serviceId) {
            service.categories = service.categories.filter(category => category._id !== action.payload._id)
          }
          return service
        })
      }
    case "EDIT_CATEGORY":
      return {
        ...state, services: state.services.map(service => {
          if (service._id === action.payload.serviceId) {
            service.categories = service.categories.map(category => {
              if (category._id === action.payload._id) {
                const { serviceId, ...newCategory } = action.payload
                category = { ...newCategory }
              }
              return category
            })
          }
          return service
        })
      }
    case "ADD_DISH":
      return {
        ...state, services: state.services.map(service => {
          if (service._id === action.payload.serviceId) {
            service.categories = service.categories.map(category => {
              if (category._id === action.payload.categoryId) {
                category.dishes = [...category.dishes, action.payload]
              }
              return category
            })
          }
          return service
        })
      }
    case "SET_SHOW_LOADING":
      return { ...state, showLoading: action.payload }
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