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

import RadarChart from 'react-svg-radar-chart';

export default function AnswerList() {

    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    useEffect( () => {

        fetchAll('answers/answersByCustomer/1')
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {answers.map((answer) => {


                                    let singleAnswer = answer.answers.map( singleAnswer => (
                                        <div>
                                            <p>{singleAnswer.number_answer}</p>
                                            <p>{singleAnswer.text_answer}</p>
                                        </div>
                                    ));


                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <p>{answer.question.header}</p>
                                                <p>{answer.question.title}</p>
                                                {singleAnswer}
                                                <RadarChart
                                                    captions={
                                                        {
                                                            // columns
                                                            website: 'Webseite / Webauftritt',
                                                            webshop: 'Webseite - Webshop',
                                                            social: 'Social Media Integration',
                                                            campaign: 'Online Kampagnen',
                                                            crm: 'Lead-Management / CRM',
                                                            customer: 'Kundendaten Mgt',
                                                        }
                                                    }
                                                    data={[
                                                        {
                                                            data: {
                                                                website: 0.7,
                                                                webshop: .8,
                                                                social: 0.9,
                                                                campaign: 0.67,
                                                                crm: 0.8,
                                                                customer: 0.2
                                                            },
                                                            meta: { color: 'blue' }
                                                        },
                                                        {
                                                            data: {
                                                                website: 0.6,
                                                                webshop: 0.7,
                                                                social: 0.7,
                                                                campaign: 0.7,
                                                                crm: 0.9,
                                                                customer: 0.5
                                                            },
                                                            meta: { color: 'red' }
                                                        }
                                                    ]}
                                                    size={450}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );

                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            }

            {/*answers &&
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
            */}
        </div>
    )

}
