import React, {useEffect, useState} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function UserEdit() {

    const [isLoading, setIsLoading] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect( () => {

        axios('/api/user')
            .then( response => {
                setName(response.data.name);
                setEmail(response.data.email);
            });

    }, []);

    const onSubmit = () => {

        axios.put('/api/user', { name, email })
            .then( response => {
                console.log(response)
            });

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name={"name"}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                fullWidth
                                id={"name"}
                                label="Name"
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name={"email"}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                fullWidth
                                id={"email"}
                                label="E-Mail"
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
