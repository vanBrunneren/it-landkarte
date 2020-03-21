import React, {
    useState,
    useEffect
} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

import {
    deleteEntry,
    fetchAll
} from "../../actions/apiActions";

export default function CustomerList(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[customers, setCustomers] = useState([]);

    useEffect( () => {

        fetchAll('customers')
            .then( customers => {
                setCustomers(customers);
                setIsLoading(false);
            });

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
                                        <TableCell align={"right"}>Actions</TableCell>
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
                                            <TableCell align={"right"}>
                                                <Edit
                                                    style={{cursor: "pointer"}}
                                                    onClick={ () => props.history.push('/customer/edit/'+customer.id)} />
                                                <Delete
                                                    style={{cursor: "pointer"}}
                                                    onClick={ () => {
                                                        deleteEntry("customers", customer.id)
                                                            .then( () => {
                                                                setIsLoading(true);
                                                                fetchAll("customers")
                                                                    .then( customers => {
                                                                        setCustomers(customers);
                                                                        setIsLoading(false);
                                                                    });
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
