import React, {useEffect, useState} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Link } from "react-router-dom";

import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

import {deleteEntry, fetchAll} from "../../actions/apiActions";
import Alert from "@material-ui/lab/Alert";

export default function ThemeList(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [themes, setThemes] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect( () => {

        fetchAll("themes")
            .then( themes => {
                setThemes(themes);
                setIsLoading(false);
            });

    }, []);

    return(
        <div>
            {isLoading && <CircularProgress />}
            {message &&
                    <Alert onClose={() => setMessage(null) } severity={message.status}>
                        {message.message}
                    </Alert>
            }
            {themes &&
                <div>
                    <div style={{marginBottom: "20px"}}>
                        <Link to={"/theme/create"}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}>
                                Thema hinzufügen
                            </Button>
                        </Link>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titel</TableCell>
                                    <TableCell>Beschreibung</TableCell>
                                    <TableCell align={"right"}>Aktionen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { themes && themes.map( theme => (
                                    <TableRow key={theme.id}>
                                        <TableCell>{theme.title}</TableCell>
                                        <TableCell>{theme.description}</TableCell>
                                        <TableCell align={"right"}>
                                            <Edit
                                                style={{cursor: "pointer"}}
                                                onClick={ () => props.history.push('/theme/edit/'+theme.id) }/>
                                            <Delete
                                                style={{cursor: "pointer"}}
                                                onClick={ () => {
                                                    deleteEntry('themes', theme.id)
                                                        .then( response => {
                                                            setIsLoading(true);
                                                            setMessage(response);
                                                            fetchAll('themes')
                                                                .then( themes => {
                                                                    setThemes(themes);
                                                                    setIsLoading(false);
                                                                });
                                                        })
                                                }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    );

}
