import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {Button, Grid} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function CustomerCreate() {

    const[name, setName] = useState("");
    const[street, setStreet] = useState("");
    const[houseNumber, setHouseNumber] = useState("");
    const[plz, setPlz] = useState("");
    const[city, setCity] = useState("");
    const[successMessage, setSuccessMessage] = useState(null);

    const onSubmit = data => {

        axios.post('/api/customers', {
            name,
            street,
            houseNumber,
            plz,
            city
        }).then( () => {
            //console.log(response);
            setSuccessMessage("Die Änderungen wurden erfolgreich gespeichert!");
        });

    };

    return(
        <div>
            {successMessage &&
                <Alert onClose={() => setSuccessMessage(false) } severity="success">
                    {successMessage}
                </Alert>
            }

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        onChange={ e => setName(e.target.value) }
                        name={"name"}
                        value={name}
                        fullWidth
                        id={"name"}
                        label="Name"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        onChange={ e => setStreet(e.target.value) }
                        name={"street"}
                        value={street}
                        fullWidth
                        id={"street"}
                        label="Strasse"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        onChange={ e => setHouseNumber(e.target.value) }
                        name={"house_number"}
                        value={street}
                        fullWidth
                        id={"house_number"}
                        label="Hausnummer"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        inputProps={{maxLength: 4}}
                        onChange={ e => setPlz(e.target.value) }
                        fullWidth
                        id={"plz"}
                        name={"plz"}
                        value={plz}
                        label="PLZ"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        onChange={ e => setCity(e.target.value) }
                        fullWidth
                        id={"city"}
                        name={"city"}
                        value={city}
                        label="Ort"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" type="submit" color="primary">Speichern</Button>
                </Grid>
            </Grid>
        </div>
    )

}
