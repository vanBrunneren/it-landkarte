import React, {useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchAll, fetchSingle} from "../../actions/apiActions";
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
    const [customer, setCustomer] = useState([]);

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

                fetchSingle('customers', props.match.params.id)
                    .then( c => {
                        setCustomer(c);
                        setIsLoading(false);
                    });
            });

    }, []);

    const generateTableNames = (numberSelects) => {
        let tableNames = [];
        for(let nrSel of numberSelects) {
            for(let nrSelAnsw of nrSel.answers) {
                let personString = nrSelAnsw.person.prename + " " + nrSelAnsw.person.name + " (" + nrSelAnsw.person.person_function.name + ")";
                if(tableNames.indexOf(personString) == -1) {
                    tableNames.push(personString);
                }
            }
        }
        return tableNames;
    };

    const generateBigNumberSelectContainer = (numberSelects) => {

        let numberSelectUrl = "https://chart.googleapis.com/chart?cht=r&chs=545x545&chco=FF0000,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,D3D3D3,000099,ffa500&chxr=0,0.0,360.0&chxt=x&chd=t:";

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

        let answerTable = numberSelects.map( (numberSelect, nsIndex) => {

            let numberSelectTableAnswers = numberSelect.answers.map( (numberSelectTableAnswer, nstaIndex) => {
                return(
                    <TableCell align={"center"} key={nstaIndex}>
                        {numberSelectTableAnswer.number_answer}
                    </TableCell>
                );
            });

            return(
                <TableRow key={nsIndex}>
                    <TableCell>{numberSelect.question.title}</TableCell>
                    {numberSelectTableAnswers}
                </TableRow>
            );
        });

        return (
            <div style={{marginBottom: "20px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: '60%'}}>Frage</TableCell>
                            {generateTableNames(numberSelects).map( (tblNms, tnIndex) => (
                                <TableCell key={tnIndex} align={"center"}>{tblNms}</TableCell>
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

    };

    const generateSmallNumberSelectContainer = (numberSelects) => {

        let numberSelectUrl = "https://chart.googleapis.com/chart?cht=bvg&chs=545x545&chco=4D89F9,C6D9FD&chbh=a,5,80&chd=t:";

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
        numberSelectUrl += "&chxr=1,0,10,1&chxt=x,y&chxl=0:"+lineDescription+"&";

        let tableAnswers = numberSelects.map( (nrSel, nsIndex) => {

            let nrSelAnswer = nrSel.answers.map( (nrSelAnsw, nsaIndex) => {
                return(
                    <TableCell align={"center"} key={nsaIndex}>
                        {nrSelAnsw.number_answer}
                    </TableCell>
                );
            });

            return(
                <TableRow key={nsIndex}>
                    <TableCell>{++i}</TableCell>
                    <TableCell>{nrSel.question.title}</TableCell>
                    {nrSelAnswer}
                </TableRow>
            );
        });

        return (
            <div style={{marginTop: "40px", marginBottom: "30px"}}>
                <img src={numberSelectUrl}/>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: "5%"}}>Nummer</TableCell>
                            <TableCell style={{width: "55%"}}>Frage</TableCell>
                            {generateTableNames(numberSelects).map( (tblNms, tnIndex) => (
                                <TableCell key={tnIndex} align={"center"}>{tblNms}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableAnswers}
                    </TableBody>
                </Table>
            </div>
        );

    };

    const generateTextSelectContainer = (textSelects) => {

        return textSelects.map( (text, index) => {

            let answerPossibilities = text.question.answer_possibilities.map( (answerPos, apIndex) => {

                let personAnswers = text.answers.map( (pAns, pAnsIndex) => {

                    if(pAns.number_answer == answerPos.id) {
                        return (
                            <TableCell align={"center"} key={pAnsIndex}>
                                <CheckBoxIcon />
                            </TableCell>
                        );
                    } else {
                        return (
                            <TableCell key={pAnsIndex}></TableCell>
                        );
                    }

                });

                return(
                    <TableRow key={apIndex}>
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
                            <TableCell style={{width: '60%'}}>{text.question.title}</TableCell>
                            {tableNames.map( (tblNms, tnIndex) => (
                                <TableCell key={tnIndex} align={"center"}>{tblNms}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {answerPossibilities}
                    </TableBody>
                </Table>
            );

        });

    };

    const generateTextFieldAnswers = (textFields) => {

        return textFields.map( tfAnswers => {

            let answers = tfAnswers.answers.map( (ans, ansIndex) => {
                return(
                    <TableCell align={"center"} key={ansIndex}>
                        {ans.text_answer}
                    </TableCell>
                )
            });

            return(
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: '60%'}}>Frage</TableCell>
                            {generateTableNames(textFields).map( (tblNms, tnIndex) => (
                                <TableCell key={tnIndex} align={"center"}>{tblNms}</TableCell>
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

    };

    return(
        <div>
            {isLoading && <div style={{justifyContent: "center", alignItems: "center", display: "flex", height: "500px"}}>
                <CircularProgress />
            </div>}

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
                    { answersByTheme &&
                        answersByTheme.map( (theme, tIndex) => {

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
                                    numberSelectContainer = generateBigNumberSelectContainer(numberSelects);
                                } else {
                                    numberSelectContainer = generateSmallNumberSelectContainer(numberSelects);
                                }
                            }
                            // ------------------------------------

                            // Text Select Answers ----------------
                            let textSelectContainer;
                            if(textSelects) {
                                textSelectContainer = generateTextSelectContainer(textSelects);
                            }
                            // ------------------------------------------------

                            // Text Field Answers -----------------------------
                            let textFieldAnswers;
                            if(textFields) {
                                textFieldAnswers = generateTextFieldAnswers(textFields);
                            }
                            // ------------------------------------------------

                            return(
                                <div key={tIndex}>
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

