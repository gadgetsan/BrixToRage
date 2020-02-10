import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import StoreLocViewPage from "./Scenes/StoreLocView/StoreLocViewPage";
import StatsPage from "./Scenes/Statistics/StatsPage";
import LoginPage from "./Scenes/Account/LoginPage";
import LogoutPage from "./Scenes/Account/LogoutPage";
import RegisterPage from "./Scenes/Account/RegisterPage";
import { PrivateRoute } from "./Shared/PrivateRoute";

import PartsPage from "./../source/Components/Presentation/Pages/Parts";
import SetsPage from "./../source/Components/Presentation/Pages/Sets";
import LocationsPage from "./../source/Components/Presentation/Pages/Locations";
import configureStore from "./../source/Store/configure";

import "./styles.css";

/*
CURRENT COMPLETE STACK
React - pour le UI
Redux - gestion du State dans l'app avec des actions/reducers
Thunk - pour avoir des actions qui font des choses asynchrones
Reselect - pour avoir des selectors qui simplifient la liaison entre
            les components et le state Redux (PAS UTILISé pour l'instant je crois)
*/

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router basename={process.env.PUBLIC_URL}>
                <>
                    <PrivateRoute path="/" exact component={LocationsPage} />
                    <PrivateRoute path="/parts" exact component={PartsPage} />
                    <PrivateRoute path="/sets" exact component={SetsPage} />
                    <PrivateRoute path="/stats" exact component={StatsPage} />
                    <PrivateRoute
                        path="/storage"
                        exact
                        component={LocationsPage}
                    />
                    <PrivateRoute path="/logout" exact component={LogoutPage} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/register" exact component={RegisterPage} />
                </>
            </Router>
        </Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
