import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

//Contexts
import { AuthContext } from 'contexts/AuthContext'

function PrivateRoute({ children, ...rest }) {
  const { userActual } = useContext(AuthContext)
  const adminToken = userActual.token || localStorage.getItem('adminToken')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        adminToken ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute
