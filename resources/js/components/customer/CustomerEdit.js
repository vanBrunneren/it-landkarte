import React, {useEffect, useState} from 'react';

import {
    CircularProgress,
    Button,
    Grid, TableHead, TableRow, TableCell, Table, TableBody, Paper, TableContainer,
    TextField
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import {Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function CustomerEdit(props) {

    const { register, handleSubmit, watch, errors, setValue } = useForm();
    const onSubmit = data => {
        fetch('/api/customers/' + props.match.params.id, {
            method: 'PUT',
            mode: 'cors',
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
    };

    const[isLoading, setIsLoading] = useState(true);
    const[customer, setCustomer] = useState([]);
    const[persons, setPersons] = useState([]);

    useEffect( () => {
        fetch('/api/customers/' + props.match.params.id)
            .then(response => response.json())
            .then(jsonResponse => {
                setCustomer(jsonResponse);
                setValue("name", jsonResponse.name);
                setValue("street", jsonResponse.street);
                setValue("plz", jsonResponse.plz);
                setValue("city", jsonResponse.city);

                fetch('/api/persons/customer/' + props.match.params.id)
                    .then(response => response.json())
                    .then(jsonResponse => {
                        setPersons(jsonResponse);
                        setIsLoading(false);
                    });

            });
    }, [props.match.params.id]);

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

                    {persons &&
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vorname</TableCell>
                                        <TableCell>Nachname</TableCell>
                                        <TableCell>E-Mail</TableCell>
                                        <TableCell>Funktion</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {persons.map( person => (
                                        <TableRow key={person.id}>
                                            <TableCell>{person.prename}</TableCell>
                                            <TableCell>{person.name}</TableCell>
                                            <TableCell>{person.email}</TableCell>
                                            <TableCell>{person.person_function.name}</TableCell>
                                            <TableCell>
                                                <Link to={'/customer/edit/'+props.match.params.id+"/person/"+person.id}>
                                                    <Edit />
                                                </Link>
                                                <Delete />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    <Link to={'/customer/edit/'+props.match.params.id+"/person/create"}>
                        <Button variant="contained" type="submit" color="primary">Person hinzufügen</Button>
                    </Link>
                </div>
            }

        </div>
    );

}
