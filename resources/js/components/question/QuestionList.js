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
    TableRow
} from "@material-ui/core";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function QuestionList() {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect( () => {

        axios('/api/questions')
            .then( response => {
                setQuestions(response.data);
                setIsLoading(false);
            });

    }, []);

    return (
        <div>
            {isLoading && <CircularProgress />}

            {questions &&
                <div>
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
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titel</TableCell>
                                    <TableCell>Typ</TableCell>
                                    <TableCell align={"right"}>Aktionen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.map( (question) => (
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
                                                axios.delete('/api/questions/'+question.id)
                                                    .then( () => {
                                                        setIsLoading(true);
                                                        axios('/api/questions')
                                                            .then( response => {
                                                                setQuestions(response.data);
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
                </div>
            }
        </div>
    );

}
