import {useLocation} from "react-router-dom";
import {Toolbar, Typography} from "@material-ui/core";
import React from "react";

const translations = {
    'customers': 'Kunden',
    'customer': 'Kunden',
    'edit': 'bearbeiten',
    'themes': 'Themen',
    'theme': 'Thema',
    'questions': 'Fragen',
    'question': 'Frage',
    'create': 'hinzufügen',
    'person': 'Person'
};

export default function HomeAppBar() {
    let location = useLocation();

    let title = "";

    let res = location.pathname.split("/");
    let first = true;
    res.forEach( exp => {
        if(exp == "") return;

        if(!first && exp !== "") {
            title += " / ";
        }

        if(exp in translations) {
            title += translations[exp];
        } else {
            title += " " + exp;
        }
        first = false;
    });
    /*routes.forEach( route => {
        if(location.pathname.indexOf(route.link) != -1) {
            title = route.title;
        }
    });*/

    return(
        <Toolbar>
            <Typography variant="h6" noWrap>
                {title}
            </Typography>
        </Toolbar>
    )
}
