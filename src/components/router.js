import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import OTP from "./OTP";
import Userinfo from "./UserInfo";


class BasicRouter extends React.Component {
  render() {
    return (
      <div>
        
        <Route exact path="/" component={Login} />
        <Route exact path="/otp" component={OTP} />
        <Route exact path="/userinfo" component={Userinfo} />
       
      </div>
    );
  }
}

export default BasicRouter;



