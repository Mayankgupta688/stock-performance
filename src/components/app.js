import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import CompanyDetails from "./companyDetails";
import AddCompany from "./addCompany";
import { Route, Switch } from "react-router-dom";
import "../styles/App.css";
class App extends React.Component {
  render() {
    return (

      <Switch>
          <Route exact path="/" component={CompanyDetails} />
          <Route path="/add" component={AddCompany} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
    return {
      company: state.company
    }
}

export default connect(mapStateToProps, actions)(App);