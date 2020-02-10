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

import StartComponent from "./StartComponent";

export default function App() {

    return(
        <Router>
            <div style={{backgroundColor: '#000000'}}>
                <Container maxWidth="md" style={{backgroundColor: '#FFFFFF'}}>
                    <Switch>
                        <Route path={"/public/start"} component={StartComponent} />
                    </Switch>
                </Container>
            </div>
        </Router>
    )

}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

