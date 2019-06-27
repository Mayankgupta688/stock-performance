import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import { loadCompanyData} from "./actions/index";

import App from "./components/app";

var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
var store = createStoreWithMiddleware(rootReducer);

store.dispatch(loadCompanyData());

ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    ), 
    document.getElementById("root")
);