import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Button, Grid
} from "@material-ui/core";

import {
    Edit,
    Delete,
    Add
} from '@material-ui/icons';

export default function CustomerList(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[customers, setCustomers] = useState([]);

    const fetchAllCustomers = () => {

        axios('/api/customers')
            .then(response => {
                setIsLoading(false);
                setCustomers(response.data);
            });

    };

    useEffect( () => {
        fetchAllCustomers();
    }, []);

    return (
        <div>
            {isLoading && <CircularProgress />}

            {customers &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            onClick={ () => props.history.push("/customer/create") }
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}>
                            Kunde hinzufügen
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Kundenname</TableCell>
                                        <TableCell>Adresse</TableCell>
                                        <TableCell>PLZ</TableCell>
                                        <TableCell>Ort</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customers.map((customer, index) => (
                                        <TableRow key={customer.id}>
                                            <TableCell component="th" scope="row">
                                                {customer.name}
                                            </TableCell>
                                            <TableCell>{customer.street + " " + customer.house_number}</TableCell>
                                            <TableCell>{customer.plz}</TableCell>
                                            <TableCell>{customer.city}</TableCell>
                                            <TableCell>
                                                <Edit onClick={ () => props.history.push('/customer/edit/'+customer.id)} />
                                                <Delete
                                                    style={{cursor: "pointer"}}
                                                    onClick={ () => {
                                                    axios.delete('/api/customers/'+customer.id)
                                                        .then( () => {
                                                            setIsLoading(true);
                                                            fetchAllCustomers();
                                                        });
                                                }} />
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
