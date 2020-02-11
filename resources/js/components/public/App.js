import ReactDOM from "react-dom";
import React from "react";

import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import SurveyComponent from "./SurveyComponent";

export default function App() {

    return(
        <Router>
            <div style={{backgroundColor: '#000000', height: '100%'}}>
                <Container maxWidth="md" style={{backgroundColor: '#FFFFFF', height: '100%'}}>
                    <Switch>
                        <Route path={"/public/survey/:page"} component={SurveyComponent} />
                    </Switch>
                </Container>
            </div>
        </Router>
    )

}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

