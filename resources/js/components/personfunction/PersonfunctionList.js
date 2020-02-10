import React, {useEffect, useState} from 'react';
import {deleteEntry, fetchAll} from "../../actions/apiActions";
import {
    Button,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {
    Edit,
    Delete, Add
} from '@material-ui/icons';

export default function PersonfunctionList(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [personFunctions, setPersonFunctions] = useState([]);

    function fetchPersonFunctions() {
        fetchAll('personfunctions')
            .then( persFunc => {
                setPersonFunctions(persFunc);
                setIsLoading(false);
            });
    }

    useEffect( () => {
        fetchPersonFunctions();
    }, []);

    return(
        <div>
            {isLoading && <CircularProgress />}

            {personFunctions &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            onClick={ () => props.history.push("/personfunction/create") }
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}>
                            Funktion hinzufügen
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align={"right"}>Aktionen</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {personFunctions.map( persFunc => (
                                        <TableRow key={persFunc.id}>
                                            <TableCell>{persFunc.name}</TableCell>
                                            <TableCell align={"right"}>
                                                <Delete
                                                    style={{cursor: "pointer"}}
                                                    onClick={ () => {
                                                        setIsLoading(true);
                                                        deleteEntry("personfunctions", persFunc.id)
                                                            .then( () => {
                                                                fetchPersonFunctions();
                                                            });
                                                    }}>
                                                </Delete>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            }
        </div>
    );

}
