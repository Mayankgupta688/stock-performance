import axios from "axios";

export function employeeList(employees) {
    return {
        type: "EMPLOYEE_LIST",
        employees: employees
    }
}

export function companyList(companies) {
    return {
        type: "COMPANY_DETAILS",
        payload: companies
    }
}

export function addToCompanyList(companyData) {
    return {
        type: "ADD_COMPANY",
        payload: companyData
    }
}


export function loadCompanyData() {
    return function(dispatch) {
        return axios.get("https://9670e73hjj.execute-api.ap-south-1.amazonaws.com/dev/companies").then(response => {
            dispatch(companyList(response.data))
        })
    }
}

export function addEmployee(employeeData) {
    return {
        type: "ADD_EMPLOYEE",
        employeeData: employeeData
    }
}