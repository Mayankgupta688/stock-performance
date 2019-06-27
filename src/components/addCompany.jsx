import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

function AddCompany(props) {

    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");

    var handleInputChanges = (event) => {
        if(event.target.id === 'companyName') {
            setCompanyName(event.target.value)
        } else {
            setCompanyDescription(event.target.value);
        }
    }

    var addCompanyData = () => {

        var performanceData = [];

        for(let i=0; i< 30; i++) {
            performanceData.push(Math.floor(Math.random() * 29))
        }

        props.addToCompanyList({
            companyName: companyName,
            label: companyName,
            data: performanceData,
            companyDetails: companyDescription
        });
        props.history.push('/')
    }

    return (
        <div>
            <div className="container-fluid">
                <nav className="navbar navbar-light bg-light" style={{"marginBottom": "10px"}}>
                    <span className="navbar-brand mb-0 h1">Add New Company Details</span>
                </nav>
            </div>
            
            <div style={{"marginLeft": "40px", "marginTop": "10px"}}>
                <div class="form-group">
                    <label htmlFor="usr">Company Name:</label>
                    <input type="text" value={companyName} onChange={handleInputChanges} className="form-control" id="companyName" />
                </div>
                <div class="form-group">
                    <label htmlFor="description">Add Company Description</label>
                    <input type="textarea" value={companyDescription} onChange={handleInputChanges}  className="form-control" id="companyDescription" />
                </div>
                <button type="button" onClick={addCompanyData} class="btn btn-primary">Add Company</button>
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
