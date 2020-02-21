import React, {useEffect, useState} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Alert from "@material-ui/lab/Alert";

export default function QuestionCreate(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [themes, setThemes] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([]);
    const [header, setHeader] = useState("");
    const [title, setTitle] = useState("");

    const [themeId, setThemeId] = useState('');
    const [questionTypeId, setQuestionTypeId] = useState('');

    const [headerError, setHeaderError] = useState("");
    const [titleError, setTitleError] = useState('');
    const [themeIdError, setThemeIdError] = useState('');
    const [questionTypeIdError, setQuestionTypeIdError] = useState('');

    const [successMessage, setSuccessMessage] = useState("");

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

        !header ? setHeaderError('Titel setzen') : setHeaderError('');
        !title ? setTitleError('Frage setzen') : setTitleError('');
        !themeId ? setThemeIdError('Thema setzen') : setThemeIdError('');
        !questionTypeId ? setQuestionTypeIdError('Typ setzen') : setQuestionTypeIdError('');

        if(title && themeId && questionTypeId) {
            axios.post('/api/questions', {
                header,
                title,
                theme_id: themeId,
                question_type_id: questionTypeId
            }).then(response => {
                props.history.push("/question/edit/" + response.data.id);
            });
        }

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
                    {successMessage &&
                        <Alert onClose={() => setSuccessMessage(false) } severity="success">
                            {successMessage}
                        </Alert>
                    }
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={headerError ? true : false}
                                name={"header"}
                                value={header}
                                onChange={ e => setHeader(e.target.value) }
                                fullWidth
                                id={"header"}
                                label={"Titel"}
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={titleError ? true : false}
                                multiline
                                rows={"5"}
                                rowsMax={"5"}
                                name={"title"}
                                value={title}
                                onChange={ e => setTitle(e.target.value) }
                                fullWidth
                                id={"title"}
                                label={"Frage"}
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
                                    error={themeIdError ? true : false}
                                    id={"theme_id"}
                                    labelId={"theme_id_label"}
                                    name={"theme_id"}
                                    value={themeId}
                                    onChange={ (e) => setThemeId(e.target.value) }>
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
                                    error={questionTypeIdError ? true : false}
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
