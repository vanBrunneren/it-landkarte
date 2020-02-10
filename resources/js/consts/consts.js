import {ChatBubble, ExitToApp, LibraryBooks, People, Person, QuestionAnswer, Extension} from "@material-ui/icons";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

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
