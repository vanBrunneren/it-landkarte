import React, {useState, useEffect} from 'react';
import {fetchAll} from "../../actions/apiActions";
import {Link} from "react-router-dom";

import Intro from './Intro';
import Question from './Question';
import {CircularProgress, Button} from "@material-ui/core";

export default function SurveyComponent(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [pages, setPages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const fetchAllData = async () => {
        let questions = await fetchAll('public/questions');
        setQuestions(questions);

        let generatedPages = ['/public/'+props.match.params.hash+'/survey/intro/' + questions[0].theme_id];
        questions.map( (question, index) => {
            if(questions[index+1] && questions[index+1].theme_id != question.theme_id) {
                generatedPages.push("/public/"+props.match.params.hash+"/survey/" + (index + 1));
                generatedPages.push("/public/"+props.match.params.hash+"/survey/intro/" + questions[index+1].theme_id);
            } else {
                generatedPages.push("/public/"+props.match.params.hash+"/survey/" + (index + 1));
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
                            {...props} />
                break;
            default:
                return <Question
                            id={param}
                            quest={questions[param-1]}/>;
                break;
        }
    };

    return(
        <div style={{height: '100%', width: '100%'}}>
            {isLoading && <CircularProgress />}

            {questions &&
                <div style={{height: '100%', display: 'flex', flexDirection: 'column', flex: 1, width: '100%'}}>
                    <div style={{display: 'flex', flex: 1, width: '100%'}}>
                        {getComponent(props.match.params.page)}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {prevPage &&
                            <Link to={prevPage}>
                                Vorherige
                            </Link>
                        }
                        {nextPage &&
                            <Link to={nextPage}>
                                Nächste
                            </Link>
                        }
                    </div>
                </div>
            }
        </div>
    )

}
