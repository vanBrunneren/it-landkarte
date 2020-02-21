import React, {useEffect, useState} from 'react';

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
            <div className={'intro-content-container'}>
                <Typography variant="h4" gutterBottom>
                    {theme.title}
                </Typography>
                <div className={'question-title-container'}>
                    <Typography variant="body1" gutterBottom style={{whiteSpace: 'pre-line'}}>
                        {theme.description}
                    </Typography>
                </div>
            </div>

            <div className={'intro-image-container'}>
                <img src={"/api/public/theme/" + theme.id + "/image"} style={{height: 250}}/>
            </div>
        </div>
    )

}
