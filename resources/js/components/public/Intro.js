import React, {useEffect, useState} from 'react';

import {
    CircularProgress,
    Typography,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import {fetchAll} from "../../actions/apiActions";

export default function Intro() {

    const [isLoading, setIsLoading] = useState(true);
    const [themes, setThemes] = useState([]);

    const fetchThemes = async () => {
        let themes = await fetchAll('public/themes');
        setThemes(themes);
    };

    useEffect( () => {
        fetchThemes().then( () => setIsLoading(false) );
    }, []);

    return(
        <div>
            {isLoading && <CircularProgress />}

            <Typography variant="h2" gutterBottom>
                Einführung
            </Typography>
            <Typography variant="body1" gutterBottom>
                Wir stellen Ihnen nachfolgend einige Fragen zum Digitalisierungsgrad Ihres Unternehmens. Lassen Sie uns über folgende Bereiche sprechen:
            </Typography>
            {themes &&
                <List component="nav" aria-label="secondary mailbox folders">
                    {themes.map( theme => (
                        <ListItem key={theme.id}>
                            <ListItemText primary={"- " + theme.title} />
                        </ListItem>
                    ))}
                </List>
            }
            <img src={"/img/intro_image.png"} style={{height: 200}}/>
        </div>
    )

}
