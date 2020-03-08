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
    const [answersByTheme, setAnswersByTheme] = useState([]);

    useEffect( () => {

        fetchAll('answers/answersByCustomer/1')
            .then( answers => {
                //console.log(answers);
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
                                            "chco=FF0000,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,000099,9cf542&" +
                                            "chxr=0,0.0,360.0&" +
                                            "chxt=x&" +
                                            "chd=t:";

                                        numberSelectUrl += "100,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "10,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "20,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "30,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "40,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "50,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "60,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "70,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "80,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

                                        numberSelectUrl += "90,".repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length -1);
                                        numberSelectUrl += "|";

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

                                        return(
                                            <div>
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

