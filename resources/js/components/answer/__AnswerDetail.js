import React, {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import {fetchAll} from "../../actions/apiActions";

export default function __AnswerDetail(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    useEffect( () => {

        fetchAll('answers/answersByCustomer/'+props.match.params.id)
            .then( answers => {
                 setAnswers(answers);
                 //console.log(answers);
                 setIsLoading(false);
            });

    }, [props.match.params.id]);

    const createTextSelectAnswers = (textSelectAnswers) => {

        //console.log(textSelectAnswers);
        let answerPossibilities = textSelectAnswers.question.answer_possibilities;
        //console.log(answerPossibilities);
        textSelectAnswers.answers.map( singleAnswer => {

            let temp = answerPossibilities.find( element => singleAnswer.number_answer == element.id);
            //console.log(singleAnswer, temp);


        });

    };

    return(
        <div>
            { isLoading && <CircularProgress /> }

            { answers &&
                answers.map( answer => {

                    let questionAnswers;
                    switch(answer.question.question_type.key) {
                        case "text_select":
                            questionAnswers = createTextSelectAnswers(answer);
                            break;
                        case "number_select":
                            break;
                        case "text_field":
                            break;
                    }

                    return(
                        <div key={answer.question.id}>
                            <p>{answer.question.header}</p>
                            <p>{answer.question.title}</p>
                            <p>{answer.question.question_type.key}</p>
                            {questionAnswers}
                        </div>
                    );
                })
            }
        </div>
    )

}
