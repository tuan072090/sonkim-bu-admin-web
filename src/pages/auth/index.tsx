import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthTemplate from "../../components/templates/auth";
import { Routers } from "../../share";
import LoginForm from "./conponents/LoginForm";

const AuthPage = () => {

    return (
        <AuthTemplate>
            <Router>
                <Switch>
                    <Route path={Routers.LOGIN}>
                        <LoginForm />
                    </Route>
                </Switch>
            </Router>
        </AuthTemplate>
    )
}

export default AuthPage