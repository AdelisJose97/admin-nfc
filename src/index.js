/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
/* import RTLLayout from "layouts/RTL/RTL.js"; */
import LoginLayout from "layouts/Login/Login.js"
import PrivateRoute from 'components/PrivateRoute/PrivateRoute.js'

import 'antd/dist/antd.css';
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/black-dashboard-react.scss";
/* import "assets/css/black-dashboard-react.css"; */


import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import AuthContext from './contexts/AuthContext'

ReactDOM.render(
  <AuthContext>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/admin">
              <AdminLayout />
            </PrivateRoute>
            {/*  <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
            <Route path="/login" render={(props) => <LoginLayout {...props} />} />
            {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </AuthContext>,
  document.getElementById("root")
);
