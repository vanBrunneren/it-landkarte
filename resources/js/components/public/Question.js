import React, {useEffect, useState} from 'react';

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextFieldAnswer from "./Answers/TextFieldAnswer";
import NumberSelect from "./Answers/NumberSelect";
import TextSelect from './Answers/TextSelect';
import {create} from "../../actions/apiActions";

export default function Question(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [quest, setQuest] = useState(null);

    const [numberSelect, setNumberSelect] = useState(null);
    const [textFieldAnswer, setTextFieldAnswer] = useState(null);


    useEffect( () => {
        setQuest(props.quest);
        setIsLoading(false);
    }, [props.quest] );

    const getAnswers = (key) => {

        switch(key) {
            case "number_select":
                return <NumberSelect
                            setNumberSelect={ (selection) => setNumberSelect(selection) }
                            numberSelectTexts={quest.number_select_texts} />;
                break;
            case "text_field":
                return <TextFieldAnswer
                            setTextFieldAnswer={ (answer) => setTextFieldAnswer(answer) }
                            textInputFields={quest.textinput_fields} />;
                break;
            case "text_select":
                return <TextSelect
                            setTextSelect={ (selection) => setNumberSelect(selection) }
                            answerPossibilities={quest.answer_possibilities} />;
                break;
            default:
                return <div />;
                break;
        }

    };

    const sendAnswer = () => {

        create('public/answer', {
            person_id: 1,
            question_id: quest.id,
            question_type_id: quest.question_type.id,
            number_answer: numberSelect,
            text_answer: textFieldAnswer
        })
        .then( (res) => {
            console.log(res);
            //props.history.push('/customers')
        });

    };

    return(
        <div className={'question-single-container'}>
            {isLoading && <CircularProgress />}

            {quest &&
                <div className={'question-content-container'}>
                    <Typography variant="h4" gutterBottom>
                        {quest.header}
                    </Typography>
                    <div className={'question-title-container'}>
                        <Typography variant="body1" gutterBottom>
                            {quest.title}
                        </Typography>
                    </div>
                    <div>
                        {getAnswers(quest.question_type.key)}
                    </div>
                </div>
            }
        </div>
    );

}
