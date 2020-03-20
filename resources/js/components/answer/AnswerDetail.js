import React, {useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchAll} from "../../actions/apiActions";
import Grid from "@material-ui/core/Grid";

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
                            let themeData;
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
                                        themeData = nrSel.question.theme;
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
                                                  <td>
                                                      {numberSelectTableAnswer.number_answer}
                                                  </td>
                                              );
                                        });

                                        return(
                                            <tr>
                                                <td>{numberSelect.question.title}</td>
                                                {numberSelectTableAnswers}
                                            </tr>
                                        );
                                    });

                                    let tableNames = [];
                                    for(let nrSel of numberSelects) {
                                        themeData = nrSel.question.theme;
                                        for(let nrSelAnsw of nrSel.answers) {
                                            let personString = nrSelAnsw.person.prename + " " + nrSelAnsw.person.name + " (" + nrSelAnsw.person.person_function.name + ")";
                                            if(tableNames.indexOf(personString) == -1) {
                                                tableNames.push(personString);
                                            }
                                        }
                                    }

                                    numberSelectContainer = (
                                        <div>
                                            <h2>{themeData.title}</h2>
                                            <img src={numberSelectUrl} />
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Frage</th>
                                                        {tableNames.map( tblNms => (
                                                            <th>{tblNms}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {answerTable}
                                                </tbody>
                                            </table>
                                        </div>
                                    );

                                } else {

                                    let themeData = [];
                                    let tableNames = [];
                                    for(let nrSel of numberSelects) {
                                        themeData = nrSel.question.theme;
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
                                                <td>{nrSelAnsw.number_answer}</td>
                                            );
                                        });

                                        return(
                                            <tr>
                                                <td>{++i}</td>
                                                <td>{nrSel.question.title}</td>
                                                {nrSelAnswer}
                                            </tr>
                                        );
                                    });

                                    numberSelectContainer = (
                                        <div>
                                            <h1>{themeData.title}</h1>
                                            <img src={numberSelectUrl}/>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Nummer</th>
                                                        <th>Frage</th>
                                                        {tableNames.map( tblNms => (
                                                            <th>{tblNms}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableAnswers}
                                                </tbody>
                                            </table>
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

                                        let counter = 0;
                                        text.answers.map( answer => {
                                            if(answer.number_answer == answerPos.id) counter++;
                                        });

                                        return(
                                            <div key={answerPos.title}>
                                                <p>{counter + " " + answerPos.title}</p>
                                            </div>
                                        );
                                    });

                                    return (
                                        <div key={text.question.title}>
                                            <h2>{text.question.title}</h2>
                                            {answerPossibilities}
                                        </div>
                                    );
                                });
                            }
                            // ------------------------------------------------

                            // Text Field Answers -----------------------------
                            let textFieldAnswers;
                            if(textFields) {
                                textFieldAnswers = textFields.map( tfAnswers => {

                                    let answers = tfAnswers.answers.map( ans => {
                                        return(
                                            <div key={ans.text_answer}>
                                                <p>{ans.text_answer}</p>
                                            </div>
                                        )
                                    });

                                    return(
                                        <div key={tfAnswers.question.title}>
                                            <p>{tfAnswers.question.title}</p>
                                            {answers}
                                        </div>
                                    )
                                });
                            }
                            // ------------------------------------------------

                            return(
                                <div key={index}>
                                    {textSelectContainer}
                                    {textFieldAnswers}
                                    {numberSelectContainer}
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

