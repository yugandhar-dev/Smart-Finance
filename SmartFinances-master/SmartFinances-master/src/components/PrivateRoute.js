import React from "react";
import { useAuth } from "../context/auth";
import { Route, Redirect, useHistory } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const {authToken, setAuthToken} = useAuth();
    const history = useHistory();

    const logout = () => {
		setAuthToken();
		localStorage.removeItem("token");
		history.push("/");
    };
    
	return (
		<Route
			{...rest}
			render={props =>
				authToken ? (
					<Component {...props} logout={logout} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};
