import React, {useState, useEffect} from 'react';
import {fetchAll} from "../../actions/apiActions";
import {Link} from "react-router-dom";

import Intro from './Intro';
import Question from './Question';
import {CircularProgress} from "@material-ui/core";

export default function SurveyComponent(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState(null);

    const fetchAllData = async () => {
        let questions = await fetchAll('public/questions');
        setQuestions(questions);
    };

    useEffect( () => {
        fetchAllData().then( () => setIsLoading(false) );
    }, [props.match.params.page]);

    const getComponent = (param) => {

        switch(param) {
            case "intro":
                return <Intro />
                break;
            default:
                return <Question
                            id={param}
                            quest={questions[param-1]}/>;
                break;
        }

    };

    return(
        <div style={{height: '100%'}}>
            {isLoading && <CircularProgress />}

            {questions &&
                <div style={{height: '100%', display: 'flex', flexDirection: 'column', flex: 1}}>
                    <div style={{display: 'flex', flex: 1}}>
                        {getComponent(props.match.params.page)}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Link to={"/public/survey/intro"}>Intro</Link>
                        {questions.map( (question, index) => (
                            <Link to={"/public/survey/" + (index+1)} key={index}>{index+1}</Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    )

}
