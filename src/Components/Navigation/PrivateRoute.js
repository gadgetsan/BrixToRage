import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogged } from "Selectors/authentication";

const PrivateRoute = ({ component: Component, store, ...rest }) => {
    var state = store.getState();
    return (
        <Route
            {...rest}
            render={props =>
                isLogged(state) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
