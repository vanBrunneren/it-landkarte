import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";

export default function AnswerpossibilityEdit(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");

    useEffect( () => {

        axios('/api/answerpossibility/'+props.match.params.id)
            .then( response => {
                setTitle(response.data.title);
            });

    }, [props.match.params.id]);

    const onSubmit = () => {

        axios.put('/api/answerpossibility/'+props.match.params.id, {
            title
        }).then( response => {
            console.log(response);
        });

    };

    return(
        <div>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name={"title"}
                            value={title}
                            onChange={ e => setTitle(e.target.value) }
                            fullWidth
                            id={"title"}
                            label="Titel"
                            margin="normal"
                            variant="outlined"
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
