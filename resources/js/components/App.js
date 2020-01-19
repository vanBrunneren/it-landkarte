import React from 'react';
import ReactDOM from 'react-dom';

import CustomerList from "./customer/CustomerList";
import CustomerCreate from "./customer/CustomerCreate";
import CustomerDetail from "./customer/CustomerDetail";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {

    return (
        <Router>
            <div className={"container"}>
                <nav className="navbar navbar-dark bg-dark">
                    <Link className={"nav-link"} to="/customers">Kunden</Link>
                    <Link className={"nav-link"} to="/themes">Themen</Link>
                    <Link className={"nav-link"} to="/questions">Fragen</Link>
                    <Link className={"nav-link"} to="/answers">Auswertungen</Link>
                </nav>

                <Switch>
                    <Route path="/customers">
                        <CustomerList />
                    </Route>
                    <Route path="/customer/create">
                        <CustomerCreate />
                    </Route>
                    <Route path="/customer/:id" component={CustomerDetail} />
                </Switch>
            </div>
        </Router>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
