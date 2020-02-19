import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import ChatBubble from "@material-ui/icons/ChatBubble";
import ExitToApp from "@material-ui/icons/ExitToApp";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import Extension from "@material-ui/icons/Extension";

export const routes = [
    {
        id: 0,
        title: 'Kunden',
        link: '/customers',
        icon: <People />
    },
    {
        id: 1,
        title: 'Funktionen',
        link: '/personfunctions',
        icon: <Extension />
    },
    {
        id: 2,
        title: 'Themen',
        link: '/themes',
        icon: <LibraryBooks />
    },
    {
        id: 3,
        title: 'Fragen',
        link: '/questions',
        icon: <QuestionAnswer />
    },
    {
        id: 4,
        title: 'Auswertungen',
        link: '/results',
        icon: <ChatBubble />
    }
];

export const bottomRoutes = [
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

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
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
