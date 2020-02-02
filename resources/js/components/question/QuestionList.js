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
                    <Link to={"/question/create"}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add/>}>
                            Frage hinzufügen
                        </Button>
                    </Link>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Titel</TableCell>
                                    <TableCell>Thema</TableCell>
                                    <TableCell>Typ</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.map( (question) => (
                                    <TableRow key={question.id}>
                                        <TableCell>{question.id}</TableCell>
                                        <TableCell>{question.title}</TableCell>
                                        <TableCell>{question.theme_id}</TableCell>
                                        <TableCell>{question.question_type_id}</TableCell>
                                        <TableCell>
                                            <Link key={question.id} to={'/question/edit/'+question.id}>
                                                <Edit />
                                            </Link>
                                            <Delete onClick={ () => axios.delete('/api/questions/'+question.id) } />
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
