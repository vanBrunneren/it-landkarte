import React, {useEffect, useState} from 'react';
import {
    CircularProgress,
    Typography,
    Button
} from "@material-ui/core";

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
        <div style={{width: '100%'}}>
            {isLoading && <CircularProgress />}

            {quest &&
                <div style={{width: '100%'}}>
                    <Typography variant="h2" gutterBottom>
                        {quest.theme ? quest.theme.title : ''}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {quest.title}
                    </Typography>
                    <div>{getAnswers(quest.question_type.key)}</div>
                </div>
            }
        </div>
    );

}
