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

export default function AnswerDetail(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [answersByTheme, setAnswersByTheme] = useState([]);

    useEffect( () => {

        fetchAll('answers/answersByCustomer/'+props.match.params.id)
            .then( answers => {
                setAnswers(answers);

                let answerThemeArray = [];
                answers.forEach( answer => {
                    if(!answerThemeArray[answer.question.theme_id]) {
                       answerThemeArray[answer.question.theme_id] = [];
                    }
                    answerThemeArray[answer.question.theme_id].push(answer);
                });

                setAnswersByTheme(answerThemeArray);
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
                                { answersByTheme &&
                                    answersByTheme.map( theme => {

                                        let numberSelects = [];
                                        let textSelects = [];
                                        let textFields = [];

                                        theme.map( question => {
                                            if(question.question.question_type.key == "number_select") {
                                                numberSelects.push(question);
                                            } else if(question.question.question_type.key == "text_select") {
                                                textSelects.push(question);
                                            } else if(question.question.question_type.key == "text_field") {
                                                textFields.push(question);
                                            }
                                        });

                                        let numberSelectUrl = "https://chart.googleapis.com/chart?" +
                                            "cht=r&" +
                                            "chs=545x545&" +
                                            "chco=FF0000,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,000099,ffa500&" +
                                            "chxr=0,0.0,360.0&" +
                                            "chxt=x&" +
                                            "chd=t:";

                                        ["100,", "10,", "20,", "30,", "40,", "50,", "60,", "70,", "80,", "90,"].map( number => {
                                            numberSelectUrl += number.repeat(numberSelects.length + 1);
                                            numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                            numberSelectUrl += "|";
                                        });

                                        let answerStringArray = [];
                                        numberSelects.map( nrSel => {
                                            nrSel.answers.map( (answer, i) => {
                                                if(!answerStringArray[i]) answerStringArray[i] = [];
                                                answerStringArray[i].push(answer.number_answer * 10 + ",");
                                            });
                                        });

                                        answerStringArray.map( answerString => {
                                            answerString.map( astring => {
                                                numberSelectUrl += astring;
                                            });
                                            numberSelectUrl += answerString[0];
                                            numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                            numberSelectUrl += "|";
                                        });

                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "&";

                                        numberSelectUrl += "chxl=0:|";

                                        numberSelects.map( nrSel => {
                                            numberSelectUrl += encodeURI(nrSel.question.header) + "|";
                                        });

                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "&";

                                        let textSelectContainer;
                                        if(textSelects) {
                                            textSelectContainer = textSelects.map( text => {

                                                let answerPossibilities = text.question.answer_possibilities.map( answerPos => {

                                                    let counter = 0;
                                                    text.answers.map( answer => {
                                                        if(answer.number_answer == answerPos.id) counter++;
                                                    });

                                                    return(
                                                        <div>
                                                            <p>{counter + " " + answerPos.title}</p>
                                                        </div>
                                                    );
                                                });

                                                return (
                                                    <div>
                                                        <h2>{text.question.title}</h2>
                                                        {answerPossibilities}
                                                    </div>
                                                );
                                            });
                                        }

                                        let textFieldAnswers;
                                        if(textFields) {
                                            textFieldAnswers = textFields.map( tfAnswers => {

                                                let answers = tfAnswers.answers.map( ans => {
                                                    return(
                                                        <div>
                                                            <p>{ans.text_answer}</p>
                                                        </div>
                                                    )
                                                });

                                                return(
                                                    <div>
                                                        <p>{tfAnswers.question.title}</p>
                                                        {answers}
                                                    </div>
                                                )
                                            });
                                        }

                                        return(
                                            <div>
                                                {textSelectContainer}
                                                {textFieldAnswers}
                                                <img src={numberSelectUrl} />
                                            </div>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            }
        </div>
    )

}

