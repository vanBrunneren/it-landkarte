import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name={"title"}
                                value={title}
                                onChange={ e => setTitle(e.target.value) }
                                fullWidth
                                id={"title"}
                                label="Titel"
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id={"theme_id_label"}>Thema</InputLabel>
                                <Select
                                    id={"theme_id"}
                                    labelId={"theme_id_label"}
                                    name={"theme_id"}
                                    value={themeId}
                                    onChange={ (e) => setThemeId(e.target.value)}>
                                    {themes.map(theme => (
                                        <MenuItem
                                            key={theme.id}
                                            value={theme.id}>
                                            {theme.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id={"question_type_id_label"}>Fragetyp</InputLabel>
                                <Select
                                    id={"question_type_id"}
                                    labelId={"question_type_id_label"}
                                    name={"question_type_id"}
                                    value={questionTypeId}
                                    onChange={ (e) => setQuestionTypeId(e.target.value)}>
                                    {questionTypes.map(questionType => (
                                        <MenuItem
                                            key={questionType.id}
                                            value={questionType.id}>
                                            {questionType.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
