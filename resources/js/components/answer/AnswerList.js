import React, {useEffect, useState} from 'react';
import {deleteEntry, fetchAll} from "../../actions/apiActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Visibility from "@material-ui/icons/Visibility";
import ListIcon from '@material-ui/icons/List';

export default function AnswerList(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[customers, setCustomers] = useState([]);

    useEffect( () => {

        fetchAll('customers')
            .then( customers => {
                setCustomers(customers);
                setIsLoading(false);
            });

    }, []);

    return(
        <div>
            <div>
                {isLoading && <CircularProgress />}

                {customers &&
                    <Grid container spacing={2}>
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
                                            <TableRow  key={customer.id}>
                                                <TableCell component="th" scope="row">
                                                    {customer.name}
                                                </TableCell>
                                                <TableCell>{customer.street + " " + customer.house_number}</TableCell>
                                                <TableCell>{customer.plz}</TableCell>
                                                <TableCell>{customer.city}</TableCell>
                                                <TableCell>
                                                    <Visibility
                                                        onClick={ () => props.history.push('/result/' + customer.id) }
                                                        style={{cursor: "pointer"}} />
                                                    <ListIcon
                                                        onClick={ () => props.history.push('/result/' + customer.id + "/single") }
                                                        style={{cursor: "pointer", marginLeft: "10px"}} />
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
        </div>
    )

}
