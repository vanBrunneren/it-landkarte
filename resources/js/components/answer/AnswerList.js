import React, {useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchAll} from "../../actions/apiActions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";

export default function AnswerList() {

    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    useEffect( () => {

        fetchAll('answers')
            .then( answers => {
                console.log(answers);
                setAnswers(answers);
                setIsLoading(false);
            });

    }, []);

    return(
        <div>
            {isLoading && <CircularProgress />}

            {answers &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Kundenname</TableCell>
                                        <TableCell>Frage</TableCell>
                                        <TableCell>Antwort</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {answers.map((answer, index) => (
                                        <TableRow key={answer.id}>
                                            <TableCell component="th" scope="row">
                                                {answer.person.prename + " " + answer.person.name}
                                            </TableCell>
                                            <TableCell>
                                                {answer.question.header}
                                            </TableCell>
                                            <TableCell>
                                                {answer.number_answer ? answer.number_answer : ''}
                                                {answer.text_answer ? answer.text_answer : ''}
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
    )

}
