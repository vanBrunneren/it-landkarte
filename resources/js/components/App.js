import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";


import {
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    CardMedia
} from '@material-ui/core';

import CustomerList from "./customer/CustomerList";
import CustomerCreate from "./customer/CustomerCreate";
import CustomerEdit from "./customer/CustomerEdit";
import CustomerDetail from "./customer/CustomerDetail";
import LogoutHelper from "./auth/LogoutHelper";

import PersonEdit from "./person/PersonEdit";
import PersonCreate from "./person/PersonCreate";

import ThemeList from "./theme/ThemeList";
import ThemeCreate from "./theme/ThemeCreate";
import ThemeEdit from "./theme/ThemeEdit";

import QuestionList from "./question/QuestionList";
import QuestionCreate from "./question/QuestionCreate";
import QuestionEdit from "./question/QuestionEdit";

import AnswerpossibilityCreate from "./answerpossibility/AnswerpossibilityCreate";
import AnswerpossibilityEdit from "./answerpossibility/AnswerpossibilityEdit";

import UserEdit from './user/UserEdit';

import HomeAppBar from './HomeAppBar';

import { routes, bottomRoutes, useStyles} from '../consts/consts';

export default function App(props) {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <HomeAppBar/>
                    {/*
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to="/">
                            Material-UI
                        </Link>
                        <Link color="inherit" to="/getting-started/installation/">
                            Core
                        </Link>
                        <Typography color="textPrimary">Breadcrumb</Typography>
                    </Breadcrumbs>
                    */}
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left">
                    <div className={classes.toolbar}>
                        <Link to={"/"}>
                            <CardMedia
                                className={classes.logo}
                                image="/img/logo.png"
                                title="Logo"
                            />
                        </Link>
                    </div>
                    <Divider />
                    <List>
                        {routes.map((route) => (
                            <Link key={route.id} to={route.link} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItem button>
                                    <ListItemIcon>{route.icon}</ListItemIcon>
                                    <ListItemText primary={route.title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {bottomRoutes.map((route, index) => (
                            <Link to={route.link} key={route.id} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItem button>
                                    <ListItemIcon>{route.icon}</ListItemIcon>
                                    <ListItemText primary={route.title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path={"/customers"} component={CustomerList} />
                        <Route path={"/customer/create"} component={CustomerCreate} />
                        <Route path={"/customer/edit/:id/person/create"} component={PersonCreate} />
                        <Route path={"/customer/edit/:id/person/:personId"} component={PersonEdit} />
                        <Route path={"/customer/edit/:id"} component={CustomerEdit} />
                        <Route path={"/customer/:id"} component={CustomerDetail} />

                        <Route path={"/themes"} component={ThemeList} />
                        <Route path={"/theme/create"} component={ThemeCreate} />
                        <Route path={"/theme/edit/:id"} component={ThemeEdit} />

                        <Route path={"/questions"} component={QuestionList} />
                        <Route path={"/question/create"} component={QuestionCreate} />
                        <Route path={"/question/edit/:id"} component={QuestionEdit} />
                        <Route path={"/question/:questionId/answerpossibility/create"} component={AnswerpossibilityCreate} />
                        <Route path={"/question/:questionId/answerpossibility/edit/:id"} component={AnswerpossibilityEdit} />

                        <Route path={"/user"} component={UserEdit} />

                        <Route path={"/logout"} component={LogoutHelper} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
