import React from "react";
import CompanyDetails from "./companyDetails";
import AddCompany from "./addCompany";
import { Route, Switch } from "react-router-dom";
import "../styles/App.css";
export default class App extends React.Component {
  render() {
    return (

      <Switch>
          <Route exact path="/" component={CompanyDetails} />
          <Route path="/addcompany" component={AddCompany} />
      </Switch>
    );
  }
}