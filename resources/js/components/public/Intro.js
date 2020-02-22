import React, {useEffect, useState} from 'react';

import Typography from "@material-ui/core/Typography";

import {fetchSingle} from "../../actions/apiActions";
import Button from "@material-ui/core/Button";

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
        <div className={'intro-container'}>
            <div className={'intro-content-container'}>
                <Typography variant="h4" gutterBottom>
                    {theme.title}
                </Typography>
                <div className={'question-title-container'}>
                    <Typography variant="body1" gutterBottom style={{whiteSpace: 'pre-line'}}>
                        {theme.description}
                    </Typography>
                </div>

                <div className={'intro-image-container'}>
                    <img src={"/api/public/theme/" + theme.id + "/image"} style={{height: 250}}/>
                </div>
            </div>

            <div className={'question-component-buttons'}>
                {props.prevPage ?
                    <Button
                        onClick={ () => props.history.push(props.prevPage) }
                        variant="contained"
                        color="secondary">
                        Vorherige Frage
                    </Button> : <div />
                }

                {props.nextPage ?
                    <Button
                        onClick={ () => props.history.push(props.nextPage) }
                        variant="contained"
                        color="primary">
                        Nächste Frage
                    </Button> : <div />
                }
            </div>

        </div>
    )

}
