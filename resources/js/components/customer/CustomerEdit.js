import React, {useEffect, useRef, useState} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Visibility from "@material-ui/icons/Visibility";

import Alert from "@material-ui/lab/Alert";
import {create, deleteEntry, fetchAll, fetchSingle, update, updateWithFile} from "../../actions/apiActions";
import {Checkbox} from "@material-ui/core";

export default function CustomerEdit(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[name, setName] = useState("");
    const[street, setStreet] = useState("");
    const[houseNumber, setHouseNumber] = useState("");
    const[plz, setPlz] = useState("");
    const[city, setCity] = useState("");
    const[confluenceSpace, setConfluenceSpace] = useState("");
    const[confluenceUrl, setConfluenceUrl] = useState("");
    const[img, setImg] = useState("");
    const[persons, setPersons] = useState(null);
    const[questions, setQuestions] = useState([]);
    const[customerQuestions, setCustomerQuestions] = useState([]);
    const[successMessage, setSuccessMessage] = useState(null);
    const fileInput = useRef(null);

    function getCustomer() {
        fetchSingle("customers", props.match.params.id)
            .then( customer => {

                setCustomerQuestions(customer.questions);

                setName(customer.name);
                setStreet(customer.street);
                setHouseNumber(customer.house_number);
                setPlz(customer.plz);
                setCity(customer.city);
                setPersons(customer.people);
                setConfluenceSpace(customer.confluence_space);
                setConfluenceUrl(customer.confluence_url);
                setImg(customer.img);
                setIsLoading(false);
            });
    }

    async function getQuestions() {
        let questions = await fetchAll("questions");
        setQuestions(questions);
    }

    useEffect( () => {
        getQuestions();
        getCustomer();
    }, [props.match.params.id]);

    const onSubmit = () => {

        setIsLoading(true);

        const data = new FormData();
        data.append('file', fileInput.current.files[0]);
        data.append('name', name);
        data.append('street', street);
        data.append('houseNumber', houseNumber);
        data.append('plz', plz);
        data.append('city', city);
        data.append('confluenceSpace', confluenceSpace);
        data.append('confluenceUrl', confluenceUrl);

        updateWithFile(
            "customers",
            data,
            props.match.params.id
        )
            .then(response => {
                setSuccessMessage("Die Änderungen wurden gespeichert!");
                getCustomer();
            });

    };

    return (
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
                    <TextField
                        onChange={ e => setName(e.target.value)}
                        name={"name"}
                        value={name}
                        fullWidth
                        id={"name"}
                        label="Name"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
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
                        }}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField
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
                        }}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField
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
                        }}/>
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
                        }}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        onChange={ e => setConfluenceSpace(e.target.value) }
                        fullWidth
                        id={"confluenceSpace"}
                        name={"confluenceSpace"}
                        value={confluenceSpace}
                        label="Confluence Space"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        onChange={ e => setConfluenceUrl(e.target.value) }
                        fullWidth
                        id={"confluenceUrl"}
                        name={"confluenceUrl"}
                        value={confluenceUrl}
                        label="Confluence Url"
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        component="label">
                        Logo des Kunden hochladen
                        <input
                            ref={fileInput}
                            type="file"
                            style={{ display: "none" }} />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={6}>
                        {img &&
                        <img
                            style={{height: '250px'}}
                            src={"/api/customers/" + props.match.params.id + "/image"}/>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        type="submit"
                        color="primary">Speichern</Button>
                </Grid>

                {persons &&
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom={true}>
                        Personen
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vorname</TableCell>
                                    <TableCell>Nachname</TableCell>
                                    <TableCell>E-Mail</TableCell>
                                    <TableCell>Funktion</TableCell>
                                    <TableCell align={"right"}>Aktionen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {persons.map(person => (
                                    <TableRow key={person.id}>
                                        <TableCell>{person.prename}</TableCell>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.email}</TableCell>
                                        <TableCell>{person.person_function.name}</TableCell>
                                        <TableCell align={"right"}>
                                            <Visibility
                                                style={{cursor: "pointer"}}
                                                onClick={ () => window.open('/public/survey/'+person.hash+'/intro/4', "_blank") }/>
                                            <Edit
                                                style={{cursor: "pointer"}}
                                                onClick={ () => props.history.push('/customer/edit/' + props.match.params.id + "/person/" + person.id) } />
                                            <Delete
                                                style={{cursor: "pointer"}}
                                                onClick={ () => {
                                                    deleteEntry("persons", person.id)
                                                        .then( response => {
                                                            //console.log(response);
                                                            getCustomer();
                                                        })
                                                }}
                                                />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                }

                <Grid item xs={4}>
                    <Button
                        onClick={() => props.history.push('/customer/edit/' + props.match.params.id + "/person/create")}
                        variant="contained"
                        type="submit"
                        color="secondary">Person hinzufügen</Button>
                </Grid>

                { questions &&
                    <div style={{marginTop: "40px"}}>
                        <h5>Fragen für den Kunden bestimmen</h5>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox
                                            checked={true}
                                            onChange={ () => {
                                                create("customers/setallquestions/" + props.match.params.id, {})
                                                    .then( response => {
                                                        console.log(response);
                                                    });
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>Frage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.map( question => {
                                    return(
                                        <TableRow key={question.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={true}
                                                    onChange={ () => {
                                                        create("customers/setquestion/" + props.match.params.id + "/" + question.id, {})
                                                            .then( response => {
                                                                console.log(response);
                                                            });
                                                    }} />
                                            </TableCell>
                                            <TableCell>{question.title}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                }
            </Grid>
        }
        </div>
    );
};
