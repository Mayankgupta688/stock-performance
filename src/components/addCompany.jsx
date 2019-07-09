import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

function AddCompany(props) {

    //Application is using Hooks to define the state variable for the Component

    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [companyPerformanceStats, setCompanyPerformanceStats] = useState("");
    const [performanceData, setPerformanceData] = useState([]);

    var handleInputChanges = (event) => {
        if(event.target.id === 'companyName') {
            setCompanyName(event.target.value)
        } else {
            setCompanyDescription(event.target.value);
        }
    }

    var generateCompanyData = () => {

        if(companyName === "") {
            alert("Add Company Name to Generate Data..");
            return;
        }

        var samplePerformanceData = [];

        for(let i=0; i< 30; i++) {
            samplePerformanceData.push(Math.floor(Math.random() * 29))
        }

        setCompanyPerformanceStats(samplePerformanceData.join(', '))

        // Set the Performance data for the new company to be added..

        setPerformanceData(samplePerformanceData);
    }

    var addCompanyData = () => {

        // Validation for adding the company. Description and Name cannot be left blank.

        if(companyName === "" || companyDescription === "") {
            alert("Company Name or Description cannot be left blank..");
            return;
        }

        if(companyPerformanceStats.length === 0) {
            generateCompanyData();
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
            
            <div style={{"marginLeft": "40px", "marginTop": "10px", "marginRight": "40px"}}>
                <div className="form-group">
                    <label htmlFor="usr">Company Name:</label>
                    <input type="text" value={companyName} onChange={handleInputChanges} className="form-control" id="companyName" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Add Company Description</label>
                    <input type="textarea" value={companyDescription} onChange={handleInputChanges}  className="form-control" id="companyDescription" />
                </div>
                
                {companyPerformanceStats.length > 0 && 
                    (
                    <div className="form-group">
                        <label htmlFor="description">Company Data</label>
                        <input disabled type="textarea" value={companyPerformanceStats} onChange={handleInputChanges}  className="form-control" id="companyDescription" />
                    </div>
                    )
                }
                <button type="button" style={{"marginRight": "10px"}} onClick={addCompanyData} className="btn btn-primary">Add Company</button>
                <button type="button" onClick={generateCompanyData} className="btn btn-primary">View Performance Data</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      company: state.company
    }
}

// Redux connector to connect Props and Action to the Component

export default connect(mapStateToProps, actions)(AddCompany);
