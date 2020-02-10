import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import {Button, Grid} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {create} from "../../actions/apiActions";

export default function CustomerCreate(props) {

    const[name, setName] = useState("");
    const[street, setStreet] = useState("");
    const[houseNumber, setHouseNumber] = useState("");
    const[plz, setPlz] = useState("");
    const[city, setCity] = useState("");
    const[successMessage, setSuccessMessage] = useState(null);
    const[hasErrors, setHasErros] = useState(null);

    const onSubmit = () => {

        if(name && street && houseNumber && plz && city) {
            create("customers", {name, street, houseNumber, plz, city})
                .then( () => props.history.push('/customers') );
        } else {
            setHasErros(true);
        }

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
                        error={!name && hasErrors ? true : false}
                        required
                        helperText={!name && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
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
                        error={!street && hasErrors ? true : false}
                        required
                        helperText={!street && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
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
                        error={!houseNumber && hasErrors ? true : false}
                        required
                        helperText={!houseNumber && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
                        onChange={ e => setHouseNumber(e.target.value) }
                        name={"house_number"}
                        value={houseNumber}
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
                        error={!plz && hasErrors ? true : false}
                        required
                        helperText={!plz && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
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
                        error={!city && hasErrors ? true : false}
                        required
                        helperText={!city && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
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
                    <Button onClick={ () => onSubmit() } variant="contained" type="submit" color="primary">Speichern</Button>
                </Grid>
            </Grid>
        </div>
    )
}
