import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, TextField} from "@material-ui/core";

export default function QuestionCreate() {

    const [isLoading, setIsLoading] = useState(true);
    const [themes, setThemes] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([]);
    const [title, setTitle] = useState("");

    const [themeId, setThemeId] = useState(1);
    const [questionTypeId, setQuestionTypeId] = useState(1);

    useEffect( () => {

        axios('/api/themes')
            .then( response => {
                setIsLoading(false);
                setThemes(response.data);
            });

    }, []);

    useEffect( () => {

        axios('/api/questiontypes')
            .then( response => {
                setIsLoading(false);
                setQuestionTypes(response.data);
            });

    }, []);

    const onSubmit = () => {

        axios.post('/api/questions', {
           title,
           theme_id: themeId,
           question_type_id: questionTypeId
        }).then( response => {
            console.log(response);
        });

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
                    <TextField
                        name={"title"}
                        value={title}
                        onChange={ e => setTitle(e.target.value) }
                        fullWidth
                        id={"title"}
                        label="Titel"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <select name={"theme_id"} value={themeId} onChange={ e => setThemeId(e.target.value)}>
                        {themes.map( item => (
                            <option
                                key={item.id}
                                value={item.id}>
                              {item.title}
                            </option>
                        ))}
                    </select>
                    <select name={"question_type_id"} value={questionTypeId} onChange={ e => setQuestionTypeId(e.target.value)}>
                        {questionTypes.map( item => (
                            <option
                                key={item.id}
                                value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
