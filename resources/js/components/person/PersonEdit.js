import React, {useEffect, useState} from 'react';
import {
    CircularProgress,
    TextField,
    Select,
    MenuItem,
    Grid,
    Button,
    FormControl,
    InputLabel
} from "@material-ui/core";

export default function PersonEdit(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[personFunctions, setPersonFunctions] = useState([]);

    const[sex, setSex] = useState("");
    const[prename, setPrename] = useState("");
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[functionId, setFunctionId] = useState("");


    useEffect( () => {

        axios.get('/api/persons/' + props.match.params.personId)
            .then( response => {
                let person = response.data;
                setSex(person.sex);
                setPrename(person.prename);
                setName(person.name);
                setEmail(person.email);
                setFunctionId(person.function_id);
                setIsLoading(false);
                console.log(person);
            });

    }, [props.match.params.personId]);

    useEffect( () => {

        fetch('/api/persons/functions')
            .then( response => response.json())
            .then( jsonResponse => {
                 setPersonFunctions(jsonResponse);
            });

    }, []);

    const onSubmit = () => {

        setIsLoading(true);

        axios.put('/api/persons/' + props.match.params.personId, {
            sex,
            prename,
            name,
            email,
            function_id: functionId
        })
            .then( response => {
                console.log(response);
                setIsLoading(false);
            })

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
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
                </div>
            }
        </div>
    );

}
