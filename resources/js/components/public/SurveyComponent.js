import React, {useState, useEffect} from 'react';
import {fetchAll} from "../../actions/apiActions";
import { Link } from "react-router-dom";

import Intro from './Intro';
import Question from './Question';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Outro from "./Outro";

export default function SurveyComponent(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [pages, setPages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const fetchAllData = async () => {
        let questions = await fetchAll('public/questions');
        setQuestions(questions);

        let generatedPages = ['/public/survey/'+props.match.params.hash+'/intro/' + questions[0].theme_id];
        questions.map( (question, index) => {
            if(questions[index+1] && questions[index+1].theme_id != question.theme_id) {
                generatedPages.push("/public/survey/"+props.match.params.hash+"/" + (index + 1));
                generatedPages.push("/public/survey/"+props.match.params.hash+"/intro/" + questions[index+1].theme_id);
            } else {
                generatedPages.push("/public/survey/"+props.match.params.hash+"/" + (index + 1));
            }
        });
        setPages(generatedPages);
        let currentIndex = generatedPages.indexOf(props.match.url);
        setPrevPage(generatedPages[currentIndex-1] ? generatedPages[currentIndex-1] : null);
        setNextPage(generatedPages[currentIndex+1] ? generatedPages[currentIndex+1] : null);

    };

    useEffect( () => {
        fetchAllData().then( () => setIsLoading(false) );
    }, [props.match.params.page]);

    const getComponent = (param) => {
        switch(param) {
            case "intro":
                return <Intro
                            {...props} />;
                break;
            case "outro":
                return <Outro
                            {...props} />;
                break;
            default:
                return <Question
                            id={param}
                            quest={questions[param-1]}/>;
                break;
        }
    };

    return(
        <div className={'survey-component-container'}>
            {isLoading && <CircularProgress color={'black'}/>}

            {questions &&
                <div className={'questions-container'}>
                    <div className={'questions-component-container'}>
                        {getComponent(props.match.params.page)}
                    </div>
                    <div className={'question-component-buttons'}>
                        {prevPage ?
                            <Button
                                onClick={ () => props.history.push(prevPage) }
                                variant="contained"
                                color="secondary">
                                Vorherige Frage
                            </Button>
                            :
                            <div />
                        }
                        {nextPage ?
                            <Button
                                onClick={ () => props.history.push(nextPage) }
                                variant="contained"
                                color="primary">
                                Nächste Frage
                            </Button>
                            :
                            <Button
                                onClick={() => props.history.push("/public/survey/" + props.match.params.hash + "/outro")}
                                variant="contained"
                                color="primary">
                                Umfrage abschliessen
                            </Button>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

