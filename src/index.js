import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import StoreLocViewPage from "./Scenes/StoreLocView/StoreLocViewPage";
import SetsPage from "./Scenes/SetsView/SetsPage";
import StatsPage from "./Scenes/Statistics/StatsPage";
import PartListPage from "./Scenes/PartListView/PartListPage";
import LoginPage from "./Scenes/Account/LoginPage";
import LogoutPage from "./Scenes/Account/LogoutPage";
import RegisterPage from "./Scenes/Account/RegisterPage";
import { PrivateRoute } from "./Shared/PrivateRoute";

import "./styles.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
        <PrivateRoute path="/" exact component={PartListPage} />
        <PrivateRoute path="/parts" exact component={PartListPage} />
        <PrivateRoute path="/sets" exact component={SetsPage} />
        <PrivateRoute path="/stats" exact component={StatsPage} />
        <PrivateRoute path="/storage" exact component={StoreLocViewPage} />
        <PrivateRoute path="/logout" exact component={LogoutPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
      </>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
