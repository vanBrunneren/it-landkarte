import React, {useEffect, useState} from 'react';

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {create, fetchSingle} from "../../actions/apiActions";

export default function Outro(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [comment, setComment] = useState("");

    useEffect( () => {

        fetchSingle("public/persons/hash", props.match.params.hash)
            .then( response => {
                setComment(response.comment);
                setIsLoading(false);
            });

    }, [props.match.params.hash]);

    return(
        <div>
            <div className={'intro-content-container'}>
                <Typography variant="h4" gutterBottom>
                    Informationen
                </Typography>
                <div container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Und zum Schluss...
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{whiteSpace: 'pre-line'}}>
                            Haben Sie noch allgemeine Bemerkungen oder Ergänzungen, welche Ihnen für den Workshop von Bedeutung sind?
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            value={comment}
                            onChange={ e => setComment(e.target.value) }
                            rows={"8"}
                            label={"Bemerkungen"}
                            id={"comment"}
                            name={"comment"}
                            margin="normal"
                            variant="filled">
                        </TextField>
                    </Grid>
                    <div className={'outro-button-container'}>
                        <Button
                            onClick={() => {
                                create("public/persons/save-comment", {
                                    hash: props.match.params.hash,
                                    comment: comment
                                })
                                    .then( () => {
                                        props.history.push('/public/finished');
                                    });
                            }}
                            variant="contained"
                            color="primary">
                            Umfrage absenden
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}
