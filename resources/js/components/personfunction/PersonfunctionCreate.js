import React, { useState } from 'react';
import {create} from "../../actions/apiActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function PersonfunctionCreate(props) {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const onSubmit = () => {

        if(!name) {
            setNameError(true);
        } else {
            setNameError(false);
            create("personfunctions", {name})
                .then(() => props.history.push('/personfunctions'));
        }

    };

    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required={true}
                        error={nameError}
                        helperText={nameError ? "Bitte füllen Sie dieses Feld aus" : ""}
                        name={"name"}
                        value={name}
                        onChange={ e => setName(e.target.value) }
                        fullWidth
                        id={"name"}
                        label="Name"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={ () => onSubmit() } variant="contained" type="submit" color="primary">Speichern</Button>
                </Grid>
            </Grid>
        </div>
    );

}
