import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, TextField} from "@material-ui/core";


export default function PersonCreate(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [personFunctions, setPersonFunctions] = useState([]);

    const [sex, setSex] = useState("");
    const [prename, setPrename] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [functionId, setFunctionId] = useState("");

    useEffect( () => {

        axios.get('/api/persons/functions')
            .then( response => setPersonFunctions(response.data) );

    }, []);

    const onSubmit = () => {

        setIsLoading(true);

        axios.post('/api/persons', {
            customer_id: props.match.params.id,
            sex,
            prename,
            name,
            email,
            function_id: functionId
        })
            .then( () => {
                console.log("Yeah");
                setIsLoading(false);
            });

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
                    <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="male">Herr</option>
                        <option value="female">Frau</option>
                    </select>
                    <TextField
                        name={"prename"}
                        value={prename}
                        onChange={ e => setPrename(e.target.value) }
                        fullWidth
                        id={"prename"}
                        label="Vorname"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        name={"name"}
                        value={name}
                        onChange={ e => setName(e.target.value) }
                        fullWidth
                        id={"name"}
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        name={"email"}
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                        fullWidth
                        id={"email"}
                        label="E-Mail"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <select name={"function_id"} value={functionId} onChange={ (e) => setFunctionId(e.target.value)}>
                        {personFunctions.map(persFunc => (
                            <option
                                key={persFunc.id}
                                value={persFunc.id}>
                                {persFunc.name}
                            </option>
                        ))}
                    </select>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
