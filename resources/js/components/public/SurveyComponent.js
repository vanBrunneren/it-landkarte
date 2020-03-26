import React, {useState, useEffect} from 'react';
import {
    fetchAll,
    fetchSingle
} from "../../actions/apiActions";

import Intro from './Intro';
import Question from './Question';
import CircularProgress from "@material-ui/core/CircularProgress";
import Outro from "./Outro";

export default function SurveyComponent(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [pages, setPages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const [hashCheck, setHashCheck] = useState(false);

    const fetchAllData = async () => {
        let questions = await fetchAll('public/questions/'+props.match.params.hash);
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

    const checkHashValue = async () => {

        let hashCheck = await fetchSingle('public/checkhash', props.match.params.hash);
        if(!hashCheck) {
            return false;
        }
        return true;

    };

    const checkFinished = async () => {
        return await fetchSingle('public/checkfinish', props.match.params.hash);
    };

    const checkActive = async () => {
        return await fetchSingle('public/checkactive', props.match.params.hash);
    };

    useEffect( () => {

        checkActive().then(active => {
            if(active) {
                checkFinished().then( finished => {
                    if(!finished) {
                        checkHashValue().then( hashCheck => {
                            if(hashCheck) {
                                fetchAllData().then(() => setIsLoading(false));
                            } else {
                                props.history.push('/public/error');
                            }
                        });
                    } else {
                        props.history.push('/public/finished');
                    }
                });
            } else {
                props.history.push('/public/error');
            }
        });

    }, [props.match.params.page]);

    const getComponent = (param) => {
        switch(param) {
            case "intro":
                return <Intro
                            prevPage={prevPage}
                            nextPage={nextPage}
                            {...props} />;
                break;
            case "outro":
                return <Outro
                            prevPage={prevPage}
                            nextPage={nextPage}
                            {...props} />;
                break;
            default:
                return <Question
                            {...props}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            id={param}
                            quest={questions[param-1]}/>;
                break;
        }
    };

    return(
        <div className={'survey-component-container'}>
            {isLoading && <CircularProgress color={'primary'}/>}

            {questions &&
                <div className={'questions-container'}>
                    {getComponent(props.match.params.page)}
                </div>
            }
        </div>
    )
}

