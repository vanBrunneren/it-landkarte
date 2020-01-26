import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
} from "react-router-dom";


import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Breadcrumbs,
    CardMedia
} from '@material-ui/core';

import {
    People,
    LibraryBooks,
    QuestionAnswer,
    ChatBubble,
    ExitToApp,
    Person
} from "@material-ui/icons";


import CustomerList from "./customer/CustomerList";
import CustomerCreate from "./customer/CustomerCreate";
import CustomerEdit from "./customer/CustomerEdit";
import CustomerDetail from "./customer/CustomerDetail";
import LogoutHelper from "./auth/LogoutHelper";

import PersonEdit from "./person/PersonEdit";

import {
    makeStyles
} from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    logo: {
        height: '64px'
    }
}));

const routes = [
    {
        id: 0,
        title: 'Kunden',
        link: '/customers',
        icon: <People />
    },
    {
        id: 1,
        title: 'Themen',
        link: '/themes',
        icon: <LibraryBooks />
    },
    {
        id: 2,
        title: 'Fragen',
        link: '/questions',
        icon: <QuestionAnswer />
    },
    {
        id: 3,
        title: 'Auswertungen',
        link: '/results',
        icon: <ChatBubble />
    }
];

const bottomRoutes = [
    {
        id: 0,
        title: 'Benutzer',
        link: '/user',
        icon: <Person />
    },
    {
        id: 1,
        title: 'Logout',
        link: '/logout',
        icon: <ExitToApp />
    }
];

function HomeAppBar() {
    let location = useLocation();

    let title;
    routes.forEach( route => {
        if(location.pathname.indexOf(route.link) != -1) {
           title = route.title;
        }
    });

    return(
        <Toolbar>
            <Typography variant="h6" noWrap>
                {title}
            </Typography>
        </Toolbar>
    )
}

export default function App() {
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
                        <Route path={"/customer/edit/:id/person/:personId"} component={PersonEdit} />
                        <Route path={"/customer/edit/:id"} component={CustomerEdit} />
                        <Route path={"/customer/:id"} component={CustomerDetail} />

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
