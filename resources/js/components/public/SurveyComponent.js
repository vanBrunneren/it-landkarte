import React, {useState, useEffect} from 'react';
import {fetchAll} from "../../actions/apiActions";
import {Link} from "react-router-dom";

export default function SurveyComponent(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    const fetchAllData = async () => {

        let questions = await fetchAll('public/questions');
        let themes = await fetchAll('public/themes');

        //console.log(questions);
        //console.log(themes);

        setQuestions(questions);
        //setThemes(themes.data);

    };

    const getQuestionById = (id) => {
        let questlist = questions.filter( question => {
            console.log(question.id, parseInt(id), question.id === parseInt(id));
            return question.id === parseInt(id);
        });
        console.log(questlist);
    };

    useEffect( () => {

        fetchAllData()
            .then( () => {
                setIsLoading(false);
            });

    }, []);

    return(
        <div>
            <Link to={"/public/survey/1"}>1</Link>
            <Link to={"/public/survey/2"}>2</Link>
            <Link to={"/public/survey/3"}>3</Link>
            <Link to={"/public/survey/4"}>4</Link>
            {questions &&
                getQuestionById(props.match.params.page).title
            }
        </div>
    )

}
