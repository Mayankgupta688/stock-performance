import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

function AddCompany() {

    return (
        <div>
            <div className="container-fluid">
                <nav className="navbar navbar-light bg-light" style={{"marginBottom": "10px"}}>
                    <span className="navbar-brand mb-0 h1">Add New Company Details</span>
                </nav>
            </div>
            
            <div style={{"marginLeft": "40px", "marginTop": "10px"}}>
                <div class="form-group">
                    <label for="usr">Company Name:</label>
                    <input type="text" class="form-control" id="usr" />
                </div>
                <div class="form-group">
                    <label for="description">Add Company Description</label>
                    <input type="textarea"  class="form-control" id="description" />
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      company: state.company
    }
}

export default connect(mapStateToProps, actions)(AddCompany);
