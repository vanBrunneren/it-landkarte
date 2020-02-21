import React, {useEffect, useState} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import {fetchAll, fetchSingle, update} from "../../actions/apiActions";
import Alert from "@material-ui/lab/Alert";

export default function PersonEdit(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [personFunctions, setPersonFunctions] = useState([]);

    const [sex, setSex] = useState("");
    const [prename, setPrename] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [functionId, setFunctionId] = useState("");

    const [successMessage, setSuccessMessage] = useState("");


    useEffect( () => {

        fetchSingle('persons', props.match.params.personId)
            .then( person => {
                setSex(person.sex);
                setPrename(person.prename);
                setName(person.name);
                setEmail(person.email);
                setFunctionId(person.function_id);
                setIsLoading(false);
            });

    }, [props.match.params.personId]);

    useEffect( () => {

        fetchAll('persons/functions')
            .then( response => {
                setPersonFunctions(response);
            });

    }, []);

    const onSubmit = () => {

        setIsLoading(true);
        update('persons', props.match.params.personId, { sex, prename, name, email, function_id: functionId })
            .then( response => {
                setSuccessMessage('Die Änderungen wurden erfolgreich gespeichert!');
                setIsLoading(false);
            });

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {successMessage &&
                <Alert onClose={() => setSuccessMessage(false) } severity="success">
                    {successMessage}
                </Alert>
            }

            {!isLoading &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="filled">
                            <InputLabel id="sex-label">Anrede</InputLabel>
                            <Select
                                labelId="sex-label"
                                id="sex"
                                value={sex}
                                onChange={ e => setSex(e.target.value) }>
                                <MenuItem value={"male"}>Herr</MenuItem>
                                <MenuItem value={"female"}>Frau</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="filled">
                            <InputLabel id={"function_id_label"}>Funktion</InputLabel>
                            <Select
                                id={"function_id"}
                                labelId={"function_id_label"}
                                name={"function_id"}
                                value={functionId}
                                onChange={ (e) => setFunctionId(e.target.value)}>
                                {personFunctions.map(persFunc => (
                                    <MenuItem
                                        key={persFunc.id}
                                        value={persFunc.id}>
                                        {persFunc.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name={"prename"}
                            value={prename}
                            onChange={ e => setPrename(e.target.value) }
                            fullWidth
                            id={"prename"}
                            label="Vorname"
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
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
                    <Grid item xs={12}>
                        <TextField
                            name={"email"}
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
                            fullWidth
                            id={"email"}
                            label="E-Mail"
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                    </Grid>
                </Grid>
            }
        </div>
    );

}
