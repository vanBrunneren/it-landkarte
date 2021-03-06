import ReactDOM from "react-dom";
import React from "react";

import Container from '@material-ui/core/Container';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import SurveyComponent from "./SurveyComponent";
import FinishedComponent from "./FinishedComponent";
import ErrorComponent from "./ErrorComponent";

export default function App() {

    return(
        <Router>
            <div className={'root-container'}>
                <Container maxWidth="md" className={'public-container'}>
                    <Switch>
                        <Route path={"/public/survey/:hash/:page/:id?"} component={SurveyComponent} />
                        <Route path={"/public/finished"} component={FinishedComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                </Container>
            </div>
        </Router>
    )

}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

