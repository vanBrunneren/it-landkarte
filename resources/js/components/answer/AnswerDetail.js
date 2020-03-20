import React, {useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchAll} from "../../actions/apiActions";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default function AnswerDetail(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [answersByTheme, setAnswersByTheme] = useState([]);

    useEffect( () => {

        fetchAll('answers/answersByCustomer/'+props.match.params.id)
            .then( answers => {

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
            {isLoading && <div style={{justifyContent: "center", alignItems: "center", display: "flex", height: "500px"}}>
                <CircularProgress />
            </div>}

            {!isLoading &&
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    { answersByTheme &&
                        answersByTheme.map( (theme, index) => {

                            // Map Questions to Type Arrays
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
                            // -------------------------------

                            // Number Select Answers ---------
                            let numberSelectContainer;
                            if(numberSelects) {

                                if(numberSelects.length > 2) {

                                    let numberSelectUrl = "https://chart.googleapis.com/chart?" +
                                        "cht=r&" +
                                        "chs=545x545&" +
                                        "chco=FF0000,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,000099,ffa500&" +
                                        "chxr=0,0.0,360.0&" +
                                        "chxt=x&" +
                                        "chd=t:";

                                    ["100,", "10,", "20,", "30,", "40,", "50,", "60,", "70,", "80,", "90,"].map(number => {
                                        numberSelectUrl += number.repeat(numberSelects.length + 1);
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length - 1);
                                        numberSelectUrl += "|";
                                    });

                                    let answerStringArray = [];
                                    numberSelects.map(nrSel => {
                                        nrSel.answers.map((answer, i) => {
                                            if (!answerStringArray[i]) answerStringArray[i] = [];
                                            answerStringArray[i].push(answer.number_answer * 10 + ",");
                                        });
                                    });

                                    answerStringArray.map(answerString => {
                                        answerString.map(astring => {
                                            numberSelectUrl += astring;
                                        });
                                        numberSelectUrl += answerString[0];
                                        numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length - 1);
                                        numberSelectUrl += "|";
                                    });

                                    numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length - 1);
                                    numberSelectUrl += "&";

                                    numberSelectUrl += "chxl=0:|";

                                    numberSelects.map(nrSel => {
                                        numberSelectUrl += encodeURI(nrSel.question.header) + "|";
                                    });

                                    numberSelectUrl = numberSelectUrl.slice(0, numberSelectUrl.length - 1);
                                    numberSelectUrl += "&";

                                    let answerTable = numberSelects.map( numberSelect => {

                                        let numberSelectTableAnswers = numberSelect.answers.map( numberSelectTableAnswer => {
                                              return(
                                                  <TableCell align={"center"}>
                                                      {numberSelectTableAnswer.number_answer}
                                                  </TableCell>
                                              );
                                        });

                                        return(
                                            <TableRow>
                                                <TableCell>{numberSelect.question.title}</TableCell>
                                                {numberSelectTableAnswers}
                                            </TableRow>
                                        );
                                    });

                                    let tableNames = [];
                                    for(let nrSel of numberSelects) {
                                        for(let nrSelAnsw of nrSel.answers) {
                                            let personString = nrSelAnsw.person.prename + " " + nrSelAnsw.person.name + " (" + nrSelAnsw.person.person_function.name + ")";
                                            if(tableNames.indexOf(personString) == -1) {
                                                tableNames.push(personString);
                                            }
                                        }
                                    }

                                    numberSelectContainer = (
                                        <div style={{marginBottom: "20px"}}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Frage</TableCell>
                                                        {tableNames.map( tblNms => (
                                                            <TableCell align={"center"}>{tblNms}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {answerTable}
                                                </TableBody>
                                            </Table>
                                            <div style={{marginTop: "30px"}}>
                                                <img src={numberSelectUrl} />
                                            </div>
                                        </div>
                                    );

                                } else {

                                    let tableNames = [];
                                    for(let nrSel of numberSelects) {
                                        for(let nrSelAnsw of nrSel.answers) {
                                            let personString = nrSelAnsw.person.prename + " " + nrSelAnsw.person.name + " (" + nrSelAnsw.person.person_function.name + ")";
                                            if(tableNames.indexOf(personString) == -1) {
                                                tableNames.push(personString);
                                            }
                                        }
                                    }

                                    let numberSelectUrl = "";

                                    numberSelectUrl = "https://chart.googleapis.com/chart?" +
                                        "cht=bvg&" +
                                        "chs=545x545&" +
                                        "chco=4D89F9,C6D9FD&" +
                                        "chbh=a,5,80&" +
                                        "chd=t:";

                                    let graphAnswers = "";
                                    let lineDescription = "";
                                    let i = 1;
                                    for(let nrSel of numberSelects) {
                                        for(let nrSelAnsw of nrSel.answers) {
                                            graphAnswers += nrSelAnsw.number_answer * 10 + ",";
                                        }
                                        lineDescription += "|Frage " + i;
                                        i++;
                                        graphAnswers = graphAnswers.slice(0, graphAnswers.length - 1);
                                        graphAnswers += "|";
                                    }
                                    graphAnswers = graphAnswers.slice(0, graphAnswers.length - 1);

                                    numberSelectUrl += graphAnswers;
                                    numberSelectUrl += "&chxr=1,0,10,1&"+
                                        "chxt=x,y&" +
                                        "chxl=0:"+lineDescription+"&";

                                    let tableAnswers = numberSelects.map( (nrSel, i) => {

                                        let nrSelAnswer = nrSel.answers.map( nrSelAnsw => {
                                            return(
                                                <TableCell align={"center"}>{nrSelAnsw.number_answer}</TableCell>
                                            );
                                        });

                                        return(
                                            <TableRow>
                                                <TableCell>{++i}</TableCell>
                                                <TableCell>{nrSel.question.title}</TableCell>
                                                {nrSelAnswer}
                                            </TableRow>
                                        );
                                    });

                                    numberSelectContainer = (
                                        <div style={{marginTop: "40px", marginBottom: "30px"}}>
                                            <img src={numberSelectUrl}/>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Nummer</TableCell>
                                                        <TableCell>Frage</TableCell>
                                                        {tableNames.map( tblNms => (
                                                            <TableCell align={"center"}>{tblNms}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {tableAnswers}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    );

                                }

                            }
                            // ------------------------------------

                            // Text Select Answers ----------------
                            let textSelectContainer;
                            if(textSelects) {
                                textSelectContainer = textSelects.map( text => {

                                    let answerPossibilities = text.question.answer_possibilities.map( answerPos => {

                                        let personAnswers = text.answers.map( pAns => {

                                            if(pAns.number_answer == answerPos.id) {
                                                return (
                                                    <TableCell style={{width: "100px"}} align={"center"}>
                                                        <CheckBoxIcon />
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell></TableCell>
                                                );
                                            }

                                        });

                                        return(
                                            <TableRow>
                                                <TableCell>{answerPos.title}</TableCell>
                                                {personAnswers}
                                            </TableRow>
                                        );

                                    });


                                    let tableNames = [];
                                    for(let txtSelAnsw of text.answers) {
                                        let personString = txtSelAnsw.person.prename + " " + txtSelAnsw.person.name + " (" + txtSelAnsw.person.person_function.name + ")";
                                        if(tableNames.indexOf(personString) == -1) {
                                            tableNames.push(personString);
                                        }
                                    }


                                    return(
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{width: '800px'}}>{text.question.title}</TableCell>
                                                    {tableNames.map( tblNms => (
                                                        <TableCell>{tblNms}</TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {answerPossibilities}
                                            </TableBody>
                                        </Table>
                                    );

                                });
                            }
                            // ------------------------------------------------

                            // Text Field Answers -----------------------------
                            let textFieldAnswers;
                            if(textFields) {

                                let tableNames = [];
                                for(let nrSel of numberSelects) {
                                    for(let nrSelAnsw of nrSel.answers) {
                                        let personString = nrSelAnsw.person.prename + " " + nrSelAnsw.person.name + " (" + nrSelAnsw.person.person_function.name + ")";
                                        if(tableNames.indexOf(personString) == -1) {
                                            tableNames.push(personString);
                                        }
                                    }
                                }

                                textFieldAnswers = textFields.map( tfAnswers => {

                                    let answers = tfAnswers.answers.map( ans => {
                                        return(
                                            <TableCell align={"center"}>{ans.text_answer}</TableCell>
                                        )
                                    });

                                    return(
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Frage</TableCell>
                                                    {tableNames.map( tblNms => (
                                                        <TableCell align={"center"}>{tblNms}</TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{tfAnswers.question.title}</TableCell>
                                                    {answers}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                });
                            }
                            // ------------------------------------------------

                            return(
                                <div key={index}>
                                    <h3>Thema: {theme[0].question.theme.title}</h3>
                                    <div>{textFieldAnswers}</div>
                                    <div>{textSelectContainer}</div>
                                    <div>{numberSelectContainer}</div>
                                </div>
                            );
                        })
                    }
                </Grid>
            </Grid>
            }
        </div>
    )

}

