import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import StoreLocViewPage from "/src/Scenes/StoreLocView/StoreLocViewPage";
import SetsPage from "/src/Scenes/SetsView/SetsPage";
import StatsPage from "/src/Scenes/Statistics/StatsPage";
import PartListPage from "/src/Scenes/PartListView/PartListPage";
import LoginPage from "/src/Scenes/Account/LoginPage";
import RegisterPage from "/src/Scenes/Account/RegisterPage";
import { PrivateRoute } from "./Shared/PrivateRoute";

import "./styles.css";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <>
                <Route path="/" exact component={PartListPage} />
                <PrivateRoute path="/parts" exact component={PartListPage} />
                <PrivateRoute path="/sets" exact component={SetsPage} />
                <PrivateRoute path="/stats" exact component={StatsPage} />
                <PrivateRoute path="/storage" exact component={StoreLocViewPage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={RegisterPage} />
            </>
        </Router>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
