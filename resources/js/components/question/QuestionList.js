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
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";

import {deleteEntry, fetchAll} from "../../actions/apiActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

export default function QuestionList() {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletableQuestion, setDeletableQuestion] = useState( null);

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
                <div>
                    <Dialog open={deleteDialogOpen} onClose={() => deleteDialogOpen(false) } aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Möchten Sie diese Frage wirklich löschen?</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                                Abbrechen
                            </Button>
                            <Button onClick={() => {
                                if(deletableQuestion) {
                                    deleteEntry("questions", deletableQuestion)
                                        .then(() => {
                                            setIsLoading(true);
                                            fetchAll("questions/group/theme")
                                                .then(response => {
                                                    setQuestions(response);
                                                    setIsLoading(false);
                                                });
                                        });
                                    setDeletableQuestion(null);
                                }
                                setDeleteDialogOpen(false);
                            }} color="primary">
                                Löschen
                            </Button>
                        </DialogActions>
                    </Dialog>
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
                                                    <TableCell style={{width: '220px'}}>Titel</TableCell>
                                                    <TableCell>Frage</TableCell>
                                                    <TableCell style={{width: '180px'}}>Typ</TableCell>
                                                    <TableCell style={{width: '80px'}} align={"right"}>Aktionen</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {theme.questions.map( (question) => (
                                                    <TableRow key={question.id}>
                                                        <TableCell>{question.header}</TableCell>
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
                                                                    setDeletableQuestion(question.id);
                                                                    setDeleteDialogOpen(true)
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
                </div>
            }
        </div>
    );

};
