
import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import "assets/css/material-dashboard-react.css?v=1.9.0";
import { App } from "app";
//export const TokenContext = React.createContext({token:localStorage.getItem("TOKEN_KEY"),setToken:(t)=>{localStorage.setItem("TOKEN_KEY",t)}})



ReactDOM.render(
  //<TokenContext.Provider>
  <App/>
  //</TokenContext.Provider>
,
  document.getElementById("root")
);


