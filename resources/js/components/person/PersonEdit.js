import React, {useEffect, useState} from 'react';
import {CircularProgress, TextField, Select, MenuItem, Grid, Button} from "@material-ui/core";
import {useForm} from "react-hook-form";

export default function PersonEdit(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[person, setPerson] = useState([]);
    const[personFunctions, setPersonFunctions] = useState([]);
    const { register, handleSubmit, watch, errors, setValue } = useForm();

    useEffect( () => {

        fetch('/api/persons/' + props.match.params.personId)
            .then( response => response.json())
            .then( person => {
                setPerson(person);
                setIsLoading(false);

                setValue("sex", person.sex);
                setValue("prename", person.prename);
                setValue("name", person.name);
                setValue("email", person.email);
                console.log(person.function_id);
                setValue("function_id", person.function_id);

            });

    }, [props.match.params.personId]);

    useEffect( () => {

        fetch('/api/persons/functions')
            .then( response => response.json())
            .then( jsonResponse => {
                 setPersonFunctions(jsonResponse);
            });

    }, []);

    const onSubmit = data => {
        console.log(data);
    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {person &&
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select name="sex" ref={register}>
                            <option value="male">Herr</option>
                            <option value="female">Frau</option>
                        </select>
                        <TextField
                            name={"prename"}
                            inputRef={register}
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
                            name={"email"}
                            inputRef={register}
                            fullWidth
                            id={"email"}
                            label="E-Mail"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <select name={"function_id"} ref={register}>
                            <option value={"1"}>CEO</option>
                            <option value={"2"}>Produktionsleiter</option>
                            {/*personFunctions.map(persFunc => (
                                <option
                                    key={persFunc.id}
                                    value={persFunc.id}>
                                    {persFunc.name}
                                </option>
                            ))*/}
                        </select>
                        <select name={"function_id"} ref={register}>
                            {personFunctions.map(persFunc => (
                                <option
                                    key={persFunc.id}
                                    value={persFunc.id}>
                                    {persFunc.name}
                                </option>
                            ))}
                        </select>
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
