import React, {useEffect, useState} from 'react';
import {CircularProgress} from "@material-ui/core";

import TextFieldAnswer from "./Answers/TextFieldAnswer";
import NumberSelect from "./Answers/NumberSelect";
import TextSelect from './Answers/TextSelect';

export default function Question(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [quest, setQuest] = useState(null);

    useEffect( () => {
        setQuest(props.quest);
        setIsLoading(false);
    }, [props.quest] );

    const getAnswers = (key) => {

        switch(key) {
            case "number_select":
                return <NumberSelect
                            numberSelectTexts={quest.number_select_texts} />;
                break;
            case "text_field":
                return <TextFieldAnswer
                            textInputFields={quest.textinput_fields} />;
                break;
            case "text_select":
                return <TextSelect
                            answerPossibilities={quest.answer_possibilities} />;
                break;
            default:
                return <div />;
                break;
        }

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {quest &&
                <div>
                    <div>{quest.theme ? quest.theme.title : ''}</div>
                    <div>{quest.title}</div>
                    <div>{getAnswers(quest.question_type.key)}</div>
                </div>
            }
        </div>
    );

}
