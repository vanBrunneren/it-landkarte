import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CustomerList from "./customer/CustomerList";
import CustomerCreate from "./customer/CustomerCreate";
import CustomerEdit from "./customer/CustomerEdit";
import CustomerDetail from "./customer/CustomerDetail";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

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
}));

const routes = [
    {
        id: 0,
        title: 'Kunden',
        link: '/customers',
        icon: <PeopleIcon />
    },
    {
        id: 1,
        title: 'Themen',
        link: '/themes',
        icon: <LibraryBooksIcon />
    },
    {
        id: 2,
        title: 'Fragen',
        link: '/questions',
        icon: <QuestionAnswerIcon />
    },
    {
        id: 3,
        title: 'Auswertungen',
        link: '/results',
        icon: <ChatBubbleIcon />
    }
];

export default function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Permanent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left">
                    <div className={classes.toolbar} />
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
                        {['User Settings', 'Logout'].map((text, index) => (
                            <Link key={text} to="/businesspartners" style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItem button>
                                    <ListItemText primary={text} />
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
                        <Route path={"/customer/edit/:id"} component={CustomerEdit} />
                        <Route path={"/customer/:id"} component={CustomerDetail} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
