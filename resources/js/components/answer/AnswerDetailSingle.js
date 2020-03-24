import React, {useEffect, useState} from 'react';
import {fetchAll, fetchSingle} from "../../actions/apiActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

export default function AnswerDetailSingle(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect( () => {

        fetchAll('answers/answersByCustomer/'+props.match.params.id)
            .then( response => {
                setAnswers(response);

                fetchSingle('customers', props.match.params.id)
                    .then( c => {
                        setCustomer(c);
                        setIsLoading(false);
                    });
            });

    }, []);

    const onExportClick = () => {

        setSuccessMessage(true);

    };

    return(
        <div>
            {isLoading &&
                <div style={{justifyContent: "center", alignItems: "center", display: "flex", height: "500px"}}>
                    <CircularProgress />
                </div>
            }

            {
                successMessage &&
                    <Alert onClose={() => setSuccessMessage(false) } severity="error">
                        <p>Diese Auswertung wurde bereits exportiert!</p>
                    </Alert>
            }

            {!isLoading &&
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <h1>Auswertung {customer.name}</h1>
                </Grid>
                <Grid item xs={3}>
                    <img
                        style={{height: '150px'}}
                        src={"/api/customers/" + props.match.params.id + "/image"}/>
                </Grid>
                <Grid item xs={12}>
                    {answers.map(answer => {

                        switch (answer.question.question_type.key) {
                            case "text_select":
                                return (
                                    <Table key={answer.question.id}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{width: '70%'}}>{answer.question.title}</TableCell>
                                                {answer.answers.map((singleAnswer, saIndex) => (
                                                    <TableCell key={saIndex} align={"right"}>
                                                        {singleAnswer.person.prename + " " + singleAnswer.person.name + " (" + singleAnswer.person.person_function.name + ")"}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {answer.question.answer_possibilities.map((ansPos, apIndex) => {

                                                let answerRow = answer.answers.map((singleAnswer, saIndex) => {
                                                    if (singleAnswer.number_answer == ansPos.id) {
                                                        return (
                                                            <TableCell key={saIndex} align={"right"}>
                                                                <Checkbox
                                                                    checked={true}
                                                                    disabled={true}/>
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell key={saIndex}></TableCell>
                                                        );
                                                    }
                                                });

                                                return (
                                                    <TableRow key={apIndex}>
                                                        <TableCell>{ansPos.title}</TableCell>
                                                        {answerRow}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                );
                                break;
                            case "number_select":
                                return (
                                    <Table key={answer.question.id}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{width: '70%'}}>{answer.question.header}</TableCell>
                                                {answer.answers.map((singleAnswer, saIndex) => (
                                                    <TableCell key={saIndex} style={{textAlign: "right"}}>
                                                        {singleAnswer.person.prename + " " + singleAnswer.person.name + " (" + singleAnswer.person.person_function.name + ")"}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    {answer.question.title}
                                                </TableCell>
                                                {answer.answers.map((singleAnswer, saIndex) => (
                                                    <TableCell key={saIndex} style={{textAlign: "right"}}>
                                                        {singleAnswer.number_answer}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                );

                                break;
                            case "text_field":
                                return (
                                    <Table key={answer.question.id}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{width: "70%"}}>
                                                    {answer.question.header}
                                                </TableCell>
                                                {answer.answers.map((singleAnswer, saIndex) => (
                                                    <TableCell key={saIndex} align={"right"}>
                                                        {singleAnswer.person.prename + " " + singleAnswer.person.name + " (" + singleAnswer.person.person_function.name + ")"}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    {answer.question.title}
                                                </TableCell>
                                                {answer.answers.map((singleAnswer, saIndex) => (
                                                    <TableCell key={saIndex} align={"right"}>
                                                        {singleAnswer.text_answer}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                );
                                break;
                        }
                    })
                }
                </Grid>
                {/*
                <Grid item xs={12}>
                    <Button
                        onClick={onExportClick}
                        variant="contained"
                        type="submit"
                        color="secondary">
                        Auswertung exportieren
                    </Button>
                </Grid>
                */}
            </Grid>
            }
        </div>
    )

}
