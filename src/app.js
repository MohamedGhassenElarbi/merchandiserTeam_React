import React,{useEffect,useContext} from 'react'

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import loginLayout from "layouts/loginLayout";
//import {TokenContext} from "index"

const hist = createBrowserHistory();
export const App = () => {
    let token = localStorage.getItem("TOKEN_KEY");
  // let {token} = React.useContext(TokenContext)
    
    // useEffect(() => {
    //     token = localStorage.getItem("TOKEN_KEY");
    //     console.log("token " + !!token);
    // },[])

    return (
            
  <Router history={hist}>
      <Switch>
        {!token && <Route path="/login" component={loginLayout} />}
        {token && <Route path="/admin" component={Admin} />}
        {token && <Redirect from="**" to="/admin/dashboard" />}
        {!token && <Redirect from="**" to="/login" />}
      </Switch>
  </Router>
    )
}
