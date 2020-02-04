import React, { useState } from 'react';
import {Button, Grid, TextField} from "@material-ui/core";

export default function AnswerpossibilityCreate(props) {

    const [title, setTitle] = useState("");

    const onSubmit = () => {

        axios.post('/api/answerpossibility', {
            title,
            question_id: props.match.params.questionId
        }).then( response => {
            props.history.push('/question/edit/'+props.match.params.questionId);
        });

    };

    return(
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
    )

}
