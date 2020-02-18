import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import PartsPage from "Components/Presentation/Pages/Parts";
import SetsPage from "Components/Presentation/Pages/Sets";
import LocationsPage from "Components/Presentation/Pages/Locations";
import PrivateRoute from "Components/Navigation/PrivateRoute";

import LoginPage from "Components/Authentication/Login";

import configureStore from "Store/configure";

import "./styles.css";

/*
CURRENT COMPLETE STACK
React - pour le UI
Redux - gestion du State dans l'app avec des actions/reducers
Thunk - pour avoir des actions qui font des choses asynchrones
Reselect - pour avoir des selectors qui simplifient la liaison entre
            les components et le state Redux (PAS UTILISé pour l'instant je crois)

À AJOUTER POUR LE LOGIN: 
    import LoginPage from "./Scenes/Account/LoginPage";
    import LogoutPage from "./Scenes/Account/LogoutPage";
    import RegisterPage from "./Scenes/Account/RegisterPage";
    
import { PrivateRoute } from "./Shared/PrivateRoute";

    <PrivateRoute path="/logout" exact component={LogoutPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/register" exact component={RegisterPage} />
*/

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router basename={process.env.PUBLIC_URL}>
                <>
                    <PrivateRoute
                        path="/"
                        exact
                        component={LocationsPage}
                        store={store}
                    />
                    <PrivateRoute
                        path="/parts"
                        exact
                        component={PartsPage}
                        store={store}
                    />
                    <PrivateRoute
                        path="/sets"
                        exact
                        component={SetsPage}
                        store={store}
                    />
                    <PrivateRoute
                        path="/stats"
                        exact
                        component={SetsPage}
                        store={store}
                    />
                    <PrivateRoute
                        path="/storage"
                        exact
                        component={LocationsPage}
                        store={store}
                    />
                    <Route path="/login" exact component={LoginPage} />
                </>
            </Router>
        </Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
