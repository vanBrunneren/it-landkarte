import React, {useEffect, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import {
    CircularProgress,
    Button
} from "@material-ui/core";

import { useForm } from "react-hook-form";

import Grid from '@material-ui/core/Grid';

export default function CustomerEdit(props) {

    const { register, handleSubmit, watch, errors, setValue } = useForm();
    const onSubmit = data => { console.log(data) }

    const[isLoading, setIsLoading] = useState(true);
    const[customer, setCustomer] = useState([]);

    useEffect( () => {
        fetch('/api/customers/' + props.match.params.id)
            .then(response => response.json())
            .then(jsonResponse => {
                setIsLoading(false);
                setCustomer(jsonResponse);
                setValue("name", jsonResponse.name);
                setValue("street", jsonResponse.street);
                setValue("plz", jsonResponse.plz);
                setValue("city", jsonResponse.city);
            });
    }, []);

    return (
        <div>
            {isLoading && <CircularProgress />}

            {customer &&
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
            }

        </div>
    );

}
