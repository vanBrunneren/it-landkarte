import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Add, Delete, Edit} from "@material-ui/icons";

export default function ThemeList() {

    const [isLoading, setIsLoading] = useState(true);
    const [themes, setThemes] = useState([]);

    useEffect( () => {

        fetch('api/themes')
            .then( response => response.json() )
            .then( jsonResponse => {
                setThemes(jsonResponse);
                setIsLoading(false);
            });

    }, []);

    return(
        <div>
            {isLoading && <CircularProgress />}
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
                                    <TableCell>#</TableCell>
                                    <TableCell>Titel</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { themes && themes.map( theme => (
                                    <TableRow key={theme.id}>
                                        <TableCell>{theme.id}</TableCell>
                                        <TableCell>{theme.title}</TableCell>
                                        <TableCell>
                                            <Link key={theme.id} to={'/theme/edit/'+theme.id}>
                                                <Edit />
                                            </Link>
                                            <Delete onClick={ () => {
                                                axios.delete('/api/themes/'+theme.id)
                                                    .then( () => {
                                                        setIsLoading(true);
                                                        fetch('api/themes')
                                                            .then( response => response.json() )
                                                            .then( jsonResponse => {
                                                                setThemes(jsonResponse);
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
