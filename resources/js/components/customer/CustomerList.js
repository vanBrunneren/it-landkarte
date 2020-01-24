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
    CircularProgress
} from "@material-ui/core";

import {
    Edit,
    Delete
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
                                            <Delete />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

        </div>
    );
}
