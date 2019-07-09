import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Chart from "chart.js";
import "../styles/App.css";
class CompanyDetails extends React.Component {

  chartRef = React.createRef();

  constructor(props) {

    super(props);

    this.state = {
      styleData: {
        companyDetails: {
          display: 'flex',
          flexDirection: 'row'
        }, companyDetailsContainer: {
          flexGrow: "1",
          paddingLeft: "5px",
          paddingRight: "5px",
          margin: "2px",
          border: "1px solid #f1f1f1"
        }
      }, 
      selectedCompany: 'companyTwo',
      selectedDays: 30,
      chartData: [],
      chartColor: ["red", "green", "blue", "grey"],
      companyMasterList: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.company !== this.props.company) {
      this.setState({
        chartData: nextProps.company.slice(0, 4),
        companyMasterList: nextProps.company
      });
    } 
  }

  createDataset() {
    return this.state.chartData.map((data, index) => {
      return {
        label: data.label,
        fill: false,
        data: data.data,
        borderWidth: 1,
        borderColor: this.state.chartColor[index]
      }
    })
  }

  updateDayCountValue = (event) => {
    this.setState({
      selectedDays: event.target.value
    }, () => {
      this.updateDayCount();
    })
  } 

  updateDayCount = () => {

    if(!this.state.chartData)
      return;

    var dayCount = [];

    for(let i=1; i <= this.state.selectedDays; i++) {
      dayCount.push(i)
    }

    var options = {
      type: 'line',
      data: {
        labels: dayCount,
        datasets: this.createDataset(this.state.chartData)
      },
      options: {

        title: {
          display: true,
          text: "Performance Analysis For the Companies"
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Performance"
            }, ticks: {
                reverse: false
            }
          }], xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Day Count"
            }
          }]
        }
      }
    }
    
    var ctx = this.chartRef.current.getContext("2d");
    new Chart(ctx, options);

    return null;
  }

  returnDropDown() {
    return this.state.companyMasterList.map((company, index) => {
      return <option key={index} value={company.companyName}>{company.companyName}</option>
    })
  }

  changeGraphData = (event, index, company) => {
    let companyDetailsUpdated = [];
    for(let i = 0; i< this.state.chartData.length; i++) {
      if(i !== index) {
        companyDetailsUpdated.push({
          companyName: this.state.chartData[i].companyName,
          label: this.state.chartData[i].label,
          data: [...this.state.chartData[i].data],
          companyDetails: this.state.chartData[i].companyDetails
        })
      } else {

        var data = this.state.companyMasterList.filter(company => {
          return company.companyName === event.target.value
        });

        companyDetailsUpdated.push(data[0]);
      }
    }

    this.setState({
      chartData: companyDetailsUpdated
    }, () => {
      this.updateDayCount(7)
    })
  }

  componentDidMount() {
      if(this.props.company) {
        this.setState({
            chartData: this.props.company.slice(0, 4),
            companyMasterList: this.props.company
          }, () => {
            this.updateDayCount(7)
          })
      }
  }

  // Function to redirect application to "Add Company" Page

  addCompanyData = () => {
    this.props.history.push('/addcompany')
  }

  render() {
    if(this.chartRef.current) {
      this.updateDayCount();
    }
    
    
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light" style={{"marginBottom": "10px"}}>
            <span className="navbar-brand mb-0 h1">Stock Performance</span>
            <select className="performance-select-element mr-sm-2 days-selection browser-default custom-select" value={this.state.selectedDays} onChange={this.updateDayCountValue}>
                <option value="7">Performance for 7 Days</option>
                <option value="15">Performance for 15 Days</option>
                <option value="30">Performance for 30 Days</option>
            </select>
            <ul className="navbar-nav">
                <li className="nav-item active">
                  <button type="button" style={{"marginRight": "10px"}} onClick={this.addCompanyData} className="btn btn-primary">Add Company</button>
                </li>
            </ul>
        </nav>

        <div className="row">
          <div className="col-lg-10">
            <h6 style={{"margin": "10px"}}>Select Companies to Compare</h6>
          </div>

          {this.state.chartData && this.state.chartData.map((company, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="company-details-container">
                  <select className="custom-select mr-sm-2" value={company.companyName} id="inlineFormCustomSelect" style={{marginBottom: "15px"}} onChange={(event) => this.changeGraphData(event, index, company)}>
                    {this.returnDropDown()}
                  </select>
                  <div className="company-details">
                    {company.name === "" && <div className="company-details-addition">+</div>}
                    {company.name !== "" && <>{company.companyDetails}</>}
                  </div>
                </div>
              </div>
            )
          })}

        </div><br></br>

        <div className="row justify-content-md-center">
          <div className="col-lg-10">
            <canvas className="canvas-data" id="chartJSContainer" ref={this.chartRef} ></canvas>
          </div>
        </div><br></br>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
    return {
      company: state.company
    }
}

export default connect(mapStateToProps, actions)(CompanyDetails);