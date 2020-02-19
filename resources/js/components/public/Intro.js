import React, {useEffect, useState} from 'react';

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import {fetchSingle} from "../../actions/apiActions";

export default function Intro(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState([]);

    const fetchTheme = async (id) => {
        let theme = await fetchSingle('public/theme', id);
        setTheme(theme);
    };

    useEffect( () => {
        fetchTheme(props.match.params.id).then( () => setIsLoading(false) );
    }, [props.match.params.id]);

    return(
        <div>
            {isLoading && <CircularProgress />}

            <Typography variant="h2" gutterBottom>
                {theme.title}
            </Typography>
            <Typography variant="body1" gutterBottom style={{whiteSpace: 'pre-line'}}>
                {theme.description}
            </Typography>

            <img src={"/api/public/theme/" + theme.id + "/image"} style={{height: 200}}/>
        </div>
    )

}
