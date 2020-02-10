import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    Grid,
    Paper, TableBody,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Collapse, InputLabel, Select, MenuItem, FormControl,
    Typography, Radio, FormControlLabel,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {fetchAll, fetchSingle, update} from "../../actions/apiActions";

export default function QuestionEdit(props) {

    const [isLoading, setIsLoading] = useState(true);

    const [themes, setThemes] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([]);

    const [title, setTitle] = useState("");
    const [themeId, setThemeId] = useState("");
    const [questionTypeId, setQuestionTypeId] = useState("");

    const [minTitle, setMinTitle] = useState("");
    const [maxTitle, setMaxTitle] = useState("");
    const [minTitleId, setMinTitleId] = useState("");
    const [maxTitleId, setMaxTitleId] = useState("");
    const [addFieldTitle, setAddFieldTitle] = useState("");

    const [minDialogOpen, setMinDialogOpen] = useState(false);
    const [maxDialogOpen, setMaxDialogOpen] = useState(false);
    const [addFieldDialogOpen, setAddFieldDialogOpen] = useState(false);

    const [answerPossibilities, setAnswerPossibilities] = useState([]);
    const [textinputFields, setTextinputFields] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");

    useEffect( () => {

        fetchSingle("questions", props.match.params.id)
            .then( question => {

                setTitle(question.title);
                setThemeId(question.theme_id);
                setQuestionTypeId(question.question_type_id);
                setIsLoading(false);
                setAnswerPossibilities(question.answer_possibilities);

                if(question.number_select_texts) {
                    question.number_select_texts.forEach( text => {
                        if(text.key == "min") {
                            setMinTitleId(text.id);
                            setMinTitle(text.text);
                        }
                        if(text.key == "max") {
                            setMaxTitleId(text.id);
                            setMaxTitle(text.text);
                        }
                    });
                }

                if(question.textinput_fields) {
                    setTextinputFields(question.textinput_fields);
                }

            });

        fetchAll("themes")
            .then( res => {
                setThemes(res);
                setIsLoading(false);
            });

        fetchAll("questiontypes")
            .then( res => {
                setQuestionTypes(res);
                setIsLoading(false);
            });

    }, []);

    const onSubmit = () => {

        update('questions', props.match.params.id, { title, theme_id: themeId, question_type_id: questionTypeId})
            .then( response => {
                //console.log(response);
                setSuccessMessage("Die Änderungen wurden erfolgreich gespeichert!");
            });

    };

    return(
        <div>
            {isLoading && <CircularProgress />}
            {successMessage &&
                <Alert onClose={() => setSuccessMessage(false) } severity="success">
                    {successMessage}
                </Alert>
            }
            {!isLoading &&
                <div>

                    <Dialog open={minDialogOpen} onClose={() => setMinDialogOpen(false) } aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Minimum Beschriftung ändern</DialogTitle>
                        <DialogContent>
                            <TextField
                                name={"minTitle"}
                                value={minTitle}
                                onChange={ e => setMinTitle(e.target.value) }
                                fullWidth
                                id={"minTitle"}
                                label="Minimum Beschriftung"
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setMinDialogOpen(false)} color="primary">
                                Abbrechen
                            </Button>
                            <Button onClick={() => {

                                axios.post('/api/questions/change-number-select-texts', {
                                    id: minTitleId,
                                    text: minTitle,
                                    questionId: props.match.params.id,
                                    key: 'min'
                                }).then( response => console.log(response) );
                                setMinDialogOpen(false);

                            }} color="primary">
                                Speichern
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={maxDialogOpen} onClose={() => setMaxDialogOpen(false) } aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Maximum Beschriftung ändern</DialogTitle>
                        <DialogContent>
                            <TextField
                                name={"maxTitle"}
                                value={maxTitle}
                                onChange={ e => setMaxTitle(e.target.value) }
                                fullWidth
                                id={"minTitle"}
                                label="Maximum Beschriftung"
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setMinDialogOpen(false)} color="primary">
                                Abbrechen
                            </Button>
                            <Button onClick={() => {

                                axios.post('/api/questions/change-number-select-texts', {
                                    id: maxTitleId,
                                    text: maxTitle,
                                    questionId: props.match.params.id,
                                    key: 'max'
                                }).then( response => console.log(response) );
                                setMaxDialogOpen(false);

                            }} color="primary">
                                Speichern
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={addFieldDialogOpen}
                        onClose={() => setAddFieldDialogOpen(false) }
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Text Feld hinzufügen</DialogTitle>
                        <DialogContent>
                            <TextField
                                name={"addField"}
                                value={addFieldTitle}
                                onChange={ e => setAddFieldTitle(e.target.value) }
                                fullWidth
                                id={"addField"}
                                label="Feld Titel"
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setAddFieldDialogOpen(false)} color="primary">
                                Abbrechen
                            </Button>
                            <Button onClick={() => {

                                axios.post('/api/questions/add-text-field', {
                                    text: addFieldTitle,
                                    questionId: props.match.params.id,
                                }).then( response => {
                                    setIsLoading(true);
                                    setAddFieldTitle("");
                                    setAddFieldDialogOpen(false);
                                    fetchAllQuestions();
                                });

                            }} color="primary">
                                Speichern
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                        {/*
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
                        */}
                    </Grid>
                    {questionTypeId == 1 &&
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Antworten
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Titel</TableCell>
                                                <TableCell align={"right"}>Aktionen</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {answerPossibilities.map( item => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell align={"right"}>
                                                        <Edit
                                                            style={{cursor: "pointer"}}
                                                            onClick={ () => props.history.push('/question/'+props.match.params.id+'/answerpossibility/edit/'+item.id) } />
                                                        <Delete
                                                            style={{cursor: "pointer"}}
                                                            onClick={ () => {
                                                                axios.delete('/api/answerpossibility/'+item.id)
                                                                    .then( () => {
                                                                        setIsLoading(true);
                                                                        fetchAllQuestions();
                                                                    });
                                                            } } />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={ () => props.history.push("/question/" + props.match.params.id + "/answerpossibility/create") }
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<Add/>}>
                                    Antwortmöglichkeit hinzufügen
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    {questionTypeId == 2 &&
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Antworten
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( i => (
                                    <FormControlLabel control={<Radio disabled value={i} name="radio-button-demo" />}
                                        value={i}
                                        key={i}
                                        label={i}
                                        labelPlacement="bottom"/>
                                ))
                                }
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {minTitle}
                                    <Edit onClick={() => setMinDialogOpen(true) }/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={3}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {maxTitle}
                                    <Edit onClick={() => setMaxDialogOpen(true) }/>
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    {questionTypeId == 3 &&
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Antworten
                                </Typography>
                            </Grid>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {textinputFields &&
                                            textinputFields.map( field => (
                                                    <TableRow key={field.title}>
                                                        <TableCell>
                                                            <TextField
                                                                disabled
                                                                fullWidth
                                                                label={field.title}
                                                                margin="normal"
                                                                variant="filled"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Delete onClick={ () => {

                                                                axios.delete('/api/questions/remove-text-field/' + field.id)
                                                                    .then( response => {
                                                                        setIsLoading(true);
                                                                        fetchAllQuestions();
                                                                        //console.log(response)
                                                                    });

                                                            }}/>
                                                        </TableCell>
                                                    </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid item xs={12}>
                                <Button
                                    onClick={ () => setAddFieldDialogOpen(true) }
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<Add/>}>
                                    Feld hinzufügen
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
