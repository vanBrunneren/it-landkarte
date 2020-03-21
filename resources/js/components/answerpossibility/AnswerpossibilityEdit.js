import React, {useEffect, useState} from 'react';

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import {fetchSingle, update} from "../../actions/apiActions";

export default function AnswerpossibilityEdit(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");

    useEffect( () => {

        fetchSingle('answerpossibility', props.match.params.id)
            .then( answerPossibility => {
                setTitle(answerPossibility.title);
                setIsLoading(false);
            });

    }, [props.match.params.id]);

    const onSubmit = () => {

        setIsLoading(true);
        update('answerpossibility', props.match.params.id, { title })
            .then( response => {
                setIsLoading(false);
                props.history.push('/question/edit/'+props.match.params.questionId);
            });

    };

    return(
        <div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name={"title"}
                            value={title}
                            onChange={ e => setTitle(e.target.value) }
                            fullWidth
                            id={"title"}
                            label="Titel"
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={ () => onSubmit() } variant="contained" type="submit" color="primary">Speichern</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}
