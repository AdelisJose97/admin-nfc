import React, { useContext, useState } from 'react'
import './index.css'
import { Form } from 'react-bootstrap';

import Logo from '../../assets/NFClogo.svg'
import InboxIcon from '../../assets/login/correo.svg'
import LockIcon from '../../assets/login/lock.svg'

import facebookicon from '../../assets/rrss/facebook.svg'
import twittericon from '../../assets/rrss/twitter.svg'
import instagramicon from '../../assets/rrss/instagram.svg'
/* import whatsappicon from '../../Assets/rrss/whatsapp.svg' */

//Services
import LoginService from '../../services/user'

//Context
import { AuthContext } from 'contexts/AuthContext'
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
  let history = useHistory();
  let location = useLocation();

  const { dispatch } = useContext(AuthContext)

  let { from } = location.state || { from: { pathname: "/" } }

  const [user, setuser] = useState({
    username: '',
    password: ''
  })

  const handleChange = event => {
    setuser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await LoginService(user)
      if (response.status === 200) {
        const { data } = response
        console.log(data);
        localStorage.setItem("adminToken", data.token)
        localStorage.setItem("adminUsername", data.username)
        dispatch({
          type: "SET_USER",
          payload: data
        })
        history.replace(from)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="section-top">
        <div className="ilustration-container">
        </div>
        <div className="icon-container">
          <div className="icon">
            <img src={Logo} alt="" />
          </div>
          <div><p>Iniciar Sesion</p></div>
        </div>
      </div>
      <div className="section-middle">
        <div className="section-middler-container">
          <Form onSubmit={handleSubmit}>
            <div className="section-middler-container-text-area">
              <div style={{ width: '20%' }}>
                <img style={{ width: '25px' }} src={InboxIcon} alt="" />
              </div>
              <div style={{ width: '80%' }}>
                <Form.Control
                  className="form-check"
                  name="username" type="text"
                  placeholder="Ingrese usuario"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="section-middler-container-text-area">
              <div style={{ width: '20%' }}>
                <img style={{ width: '25px' }} src={LockIcon} alt="" />
              </div>
              <div style={{ width: '80%' }}>
                <Form.Control
                  className="form-check"
                  name="password"
                  type="password"
                  placeholder="Ingrese contraseña"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="remember-check">
              <Form.Check type="checkbox" label="Recordar contraseña" />
            </div>
            <div className="login-button">
              <button>Ingresar</button>
              <a href="#">Olvidaste tu contraseña?</a>
            </div>
            <div className="social-login-button">
              <button>Continuar con Facebook</button>
            </div>
            <div className="social-login-button">
              <button>Continuar con Google</button>
            </div>
          </Form>

          {/* <div className="section-middler-container-text-area">
            <div style={{ width: '20%' }}>
              <img style={{ width: '30px' }} src={InboxIcon} alt="" />
            </div>
            <textarea style={{ width: '80%' }} value="Ingrese su correo" name="" id="">correo</textarea>
          </div>
          <div className="section-middler-container-text-area">
            <textarea value="Ingrese su contraseña" name="" id="">Password</textarea>
          </div> */}
        </div>
      </div>
      <div className="section-footer">
        <div className="footer-information-rrss-icon-container">
          <img className="footer-information-rrss-icon" src={facebookicon} alt="" />
        </div>
        <div className="footer-information-rrss-icon-container">
          <img className="footer-information-rrss-icon" src={twittericon} alt="" />
        </div>
        <div className="footer-information-rrss-icon-container">
          <img className="footer-information-rrss-icon" src={instagramicon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login