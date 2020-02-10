import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid
} from "@material-ui/core";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {deleteEntry, fetchAll} from "../../actions/apiActions";

export default function QuestionList() {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect( () => {

        fetchAll("questions/group/theme")
            .then( response => {
                setQuestions(response);
                setIsLoading(false);
            });

    }, []);

    return (
        <div>
            {isLoading && <CircularProgress />}

            {questions &&
                <Grid>
                    <div style={{marginBottom: "20px"}}>
                        <Link to={"/question/create"}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add/>}>
                                Frage hinzufügen
                            </Button>
                        </Link>
                    </div>
                    <Grid container spacing={4}>
                        {questions.map( (theme) => (
                            <Grid key={theme.id} item xs={12}>
                                <Typography variant="h5" gutterBottom={true}>
                                    {theme.title}
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Titel</TableCell>
                                                <TableCell style={{width: '180px'}}>Typ</TableCell>
                                                <TableCell style={{width: '80px'}} align={"right"}>Aktionen</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {theme.questions.map( (question) => (
                                                <TableRow key={question.id}>
                                                    <TableCell>{question.title}</TableCell>
                                                    <TableCell>{question.question_type.title}</TableCell>
                                                    <TableCell align={"right"}>
                                                        <Link
                                                            style={{color: "#000000"}}
                                                            key={question.id}
                                                            to={'/question/edit/'+question.id}>
                                                            <Edit />
                                                        </Link>
                                                        <Delete
                                                            style={{cursor: "pointer"}}
                                                            onClick={ () => {
                                                                deleteEntry("questions", question.id)
                                                                    .then( () => {
                                                                        setIsLoading(true);
                                                                        fetchAll("questions/group/theme")
                                                                            .then( response => {
                                                                                setQuestions(response);
                                                                                setIsLoading(false);
                                                                            });
                                                                    });
                                                        } } />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            }
        </div>
    );

};
