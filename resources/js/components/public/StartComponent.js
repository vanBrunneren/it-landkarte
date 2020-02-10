import {
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Typography,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup, TextField
} from "@material-ui/core";

import React, { useEffect, useState } from "react";

export default function StartComponent() {

    const [isLoading, setIsLoading] = useState(true);
    const [themes, setThemes] = useState([]);
    const [questions, setQuestions] = useState([]);

    const fetchAllData = async () => {

        let questions = await axios.get('/api/public/questions');
        let themes = await axios.get('/api/public/themes');

        console.log(questions.data);
        setQuestions(questions.data);
        setThemes(themes.data);

    };

    useEffect( () => {

        fetchAllData()
            .then( () => {
                setIsLoading(false);
            });

    }, []);

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
                    <Typography variant="h2" gutterBottom>
                        Einführung
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Wir stellen Ihnen nachfolgend einige Fragen zum Digitalisierungsgrad Ihres Unternehmens. Lassen Sie uns über folgende Bereiche sprechen:
                    </Typography>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {themes.map( theme => (
                            <ListItem key={theme.id}>
                                <ListItemText primary={"- " + theme.title} />
                            </ListItem>
                        ))}
                    </List>
                    <img src={"/img/intro_image.png"} style={{height: 200}}/>
                    {questions.map( question => {

                        console.log(question);
                        switch(question.question_type.key) {
                            case "text_select":
                                let answers = question.answer_possibilities.map( answer => (
                                    <FormControlLabel value={answer.id} control={<Radio />} label={answer.title} />
                                ));
                                return(
                                    <div>
                                        <Typography variant="h5" gutterBottom>
                                            {question.title}
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup name={"question_"+question.id} onChange={ () => {} }>
                                                {answers}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                );
                                break;
                            case "number_select":
                                return(
                                    <div>
                                        <Typography variant="h5" gutterBottom>
                                            {question.title}
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup name={"question_"+question.id} row onChange={ () => {} }>
                                                { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( i => (
                                                    <FormControlLabel control={<Radio value={i} name="radio-button-demo" />}
                                                                      value={i}
                                                                      key={i}
                                                                      label={i}
                                                                      labelPlacement="bottom"/>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        {question.number_select_texts.map( nst => {

                                            return(
                                                <div>
                                                    {nst.key}: {nst.text}
                                                </div>
                                            );

                                        })}
                                    </div>
                                );
                                break;
                            case "text_field":
                                return(
                                    <div>
                                        {question.title}
                                        <TextField
                                            name={"title"}
                                            fullWidth
                                            id={"title"}
                                            label="Titel"
                                            margin="normal"
                                            variant="filled"
                                            InputLabelProps={{
                                                shrink: true,
                                            }} />
                                    </div>
                                );
                            default: return;
                        }

                    })}
                </div>
            }
        </div>
    )

}






















