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
    Typography
} from "@material-ui/core";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

export default function QuestionEdit(props) {

    const [isLoading, setIsLoading] = useState(true);

    const [themes, setThemes] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([]);

    const [title, setTitle] = useState("");
    const [themeId, setThemeId] = useState("");
    const [questionTypeId, setQuestionTypeId] = useState("");

    const [answerPossibilities, setAnswerPossibilities] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");

    const fetchAllQuestions = () => {

        axios('/api/questions/' + props.match.params.id)
            .then( response => {

                let question = response.data;
                setTitle(question.title);
                setThemeId(question.theme_id);
                setQuestionTypeId(question.question_type_id);
                setIsLoading(false);
                setAnswerPossibilities(question.answer_possibilities);

            });

    }

    useEffect( () => {

        fetchAllQuestions();

    }, []);

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

      axios.put('/api/questions/' + props.match.params.id, {
          title,
          theme_id: themeId,
          question_type_id: questionTypeId
      }).then( response => {
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
                                                    <Edit onClick={ () => props.history.push('/question/'+props.match.params.id+'/answerpossibility/edit/'+item.id) } />
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
                        <Grid item xs={12}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
