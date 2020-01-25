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
    Button
} from "@material-ui/core";

import {
    Edit,
    Delete,
    Add
} from '@material-ui/icons';

export default function CustomerList() {

    const[isLoading, setIsLoading] = useState(true);
    const[customers, setCustomers] = useState([]);

    useEffect( () => {
        fetch('/api/customers')
            .then(response => response.json())
            .then(jsonResponse => {
                setIsLoading(false);
                setCustomers(jsonResponse);
            });
    }, []);

    return (
        <div>
            {isLoading && <CircularProgress />}

            {customers &&
                <div>
                    <div style={{marginBottom: "20px"}}>
                        <Link to={"/customer/create"}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}>
                                Kunde hinzufügen
                            </Button>
                        </Link>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Kundenname</TableCell>
                                    <TableCell>Strasse</TableCell>
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
                                        <TableCell>{customer.street}</TableCell>
                                        <TableCell>{customer.plz}</TableCell>
                                        <TableCell>{customer.city}</TableCell>
                                        <TableCell>
                                            <Link key={customer.id} to={'/customer/edit/'+customer.id}>
                                                <Edit />
                                            </Link>
                                            <Delete onClick={ () => {
                                                fetch('/api/customers/'+customer.id, {
                                                    method: 'DELETE',
                                                    mode: 'cors',
                                                    cache: "no-cache",
                                                    credentials: "same-origin",
                                                    headers: {
                                                        "Content-Type": 'application/json'
                                                    }
                                                });
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
