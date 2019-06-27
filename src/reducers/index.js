import { combineReducers } from "redux";
import company from "./company_reducer";

export const rootReducer = combineReducers({
    company: company
});

