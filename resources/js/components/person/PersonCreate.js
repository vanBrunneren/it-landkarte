import React, {useEffect, useState} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

import AddIcon from '@material-ui/icons/Add';
import {create, fetchAll} from "../../actions/apiActions";
import Link from "react-router-dom/Link";


export default function PersonCreate(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [personFunctions, setPersonFunctions] = useState([]);

    const [sex, setSex] = useState("");
    const [prename, setPrename] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [functionId, setFunctionId] = useState("");

    const [hasErrors, setHasErrors] = useState(false);

    useEffect( () => {

        fetchAll('persons/functions')
            .then( response => {
                setPersonFunctions(response);
                setIsLoading(false);
            });

    }, []);

    const onSubmit = () => {

        setIsLoading(true);
        if(sex && prename && name && email && functionId) {
            create('persons', { customer_id: props.match.params.id, sex, prename, name, email, function_id: functionId })
                .then( () => props.history.push('/customer/edit/' + props.match.params.id));
        } else {
            setHasErrors(true);
        }
        setIsLoading(false);

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl
                            error={!sex && hasErrors ? true : false}
                            required
                            fullWidth
                            variant="filled">
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
                    <Grid item xs={11}>
                        <FormControl
                            error={!functionId && hasErrors ? true : false}
                            required
                            fullWidth
                            variant="filled">
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
                    <Grid item xs={1}>
                        <Link to={"/personfunction/create"}>
                            <Fab size={"small"} color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={!prename && hasErrors ? true : false}
                            required
                            helperText={!prename && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
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
                            error={!name && hasErrors ? true : false}
                            required
                            helperText={!name && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
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
                            error={!email && hasErrors ? true : false}
                            required
                            helperText={!email && hasErrors ? "Bitte füllen Sie dieses Feld aus" : ""}
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
