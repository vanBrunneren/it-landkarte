import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {Button, Grid} from "@material-ui/core";
import {useForm} from "react-hook-form";

export default function CustomerCreate() {

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        fetch('/api/customers', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });

    };

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name={"name"}
                    inputRef={register}
                    fullWidth
                    id={"name"}
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <TextField
                    name={"street"}
                    inputRef={register}
                    fullWidth
                    id={"street"}
                    label="Strasse"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            id={"plz"}
                            name={"plz"}
                            inputRef={register}
                            label="PLZ"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            id={"city"}
                            name={"city"}
                            inputRef={register}
                            label="Ort"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Button variant="contained" type="submit" color="primary">Speichern</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )

}
