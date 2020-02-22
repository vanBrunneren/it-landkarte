import React, {useEffect, useState} from 'react';

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextFieldAnswer from "./Answers/TextFieldAnswer";
import NumberSelect from "./Answers/NumberSelect";
import TextSelect from './Answers/TextSelect';
import {create, fetchAll} from "../../actions/apiActions";

export default function Question(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [quest, setQuest] = useState(null);

    const [numberSelect, setNumberSelect] = useState(null);
    const [textFieldAnswer, setTextFieldAnswer] = useState(null);

    const [answer, setAnswer] = useState(null);

    useEffect( () => {

        fetchAll('answers/'+props.quest.id+"/"+props.match.params.hash)
            .then( response => {
                if(response) {
                    setAnswer(response);
                } else {
                    setAnswer(null);
                }

                setQuest(props.quest);
                setIsLoading(false);

            });

    }, [props.quest] );

    const getAnswers = (key) => {

        switch(key) {
            case "number_select":
                return <NumberSelect
                            answer={answer}
                            setNumberSelect={ (selection) => setNumberSelect(selection) }
                            numberSelectTexts={quest.number_select_texts} />;
                break;
            case "text_field":
                return <TextFieldAnswer
                            answer={answer}
                            setTextFieldAnswer={ (answer) => setTextFieldAnswer(answer) }
                            textInputFields={quest.textinput_fields} />;
                break;
            case "text_select":
                return <TextSelect
                            answer={answer}
                            setTextSelect={ (selection) => setNumberSelect(selection) }
                            answerPossibilities={quest.answer_possibilities} />;
                break;
            default:
                return <div />;
                break;
        }

    };

    const sendAnswer = () => {

        setIsLoading(true);
        if(numberSelect || textFieldAnswer) {
            create('public/answer', {
                hash: props.match.params.hash,
                question_id: quest.id,
                question_type_id: quest.question_type.id,
                number_answer: numberSelect,
                text_answer: textFieldAnswer
            })
                .then((res) => {
                    setNumberSelect(null);
                    setTextFieldAnswer(null);
                    setAnswer(null);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }

    };

    return(
        <div className={'question-single-container'}>
            {isLoading && <CircularProgress />}

            {!isLoading &&
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

            <div className={'question-component-buttons'}>
                {props.prevPage ?
                    <Button
                        onClick={ () => {
                            props.history.push(props.prevPage)
                        }}
                        variant="contained"
                        color="secondary">
                        Vorherige Frage
                    </Button> : <div />
                }

                {props.nextPage ?
                    <Button
                        onClick={ () => {
                            sendAnswer();
                            props.history.push(props.nextPage);
                        }}
                        variant="contained"
                        color="primary">
                        Nächste Frage
                    </Button>
                    :
                    <Button
                        onClick={() => {
                            sendAnswer();
                            props.history.push("/public/survey/" + props.match.params.hash + "/outro")
                        }}
                        variant="contained"
                        color="primary">
                        Umfrage abschliessen
                    </Button>
                }
            </div>

        </div>
    );

}
