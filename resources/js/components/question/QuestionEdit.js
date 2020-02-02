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
    TextField
} from "@material-ui/core";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function QuestionEdit(props) {

    const [isLoading, setIsLoading] = useState(true);

    const [themes, setThemes] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([]);

    const [title, setTitle] = useState("");
    const [themeId, setThemeId] = useState("");
    const [questionTypeId, setQuestionTypeId] = useState("");

    const [answerPossibilities, setAnswerPossibilities] = useState([]);

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
      }).then( response => console.log(response) );

    };

    return(
        <div>
            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <select name={"theme_id"} value={themeId} onChange={ e => setThemeId(e.target.value)}>
                                {themes.map( item => (
                                    <option
                                        key={item.id}
                                        value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </Grid>
                        <Grid item xs={12}>
                            <select name={"question_type_id"} value={questionTypeId} onChange={ e => setQuestionTypeId(e.target.value)}>
                                {questionTypes.map( item => (
                                    <option
                                        key={item.id}
                                        value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
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
                                                    <Link
                                                        style={{color: "#000000"}}
                                                        key={item.id}
                                                        to={'/question/'+props.match.params.id+'/answerpossibility/edit/'+item.id}>
                                                        <Edit />
                                                    </Link>
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
                            <Link to={"/question/" + props.match.params.id + "/answerpossibility/create"}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<Add/>}>
                                    Antwortmöglichkeit hinzufügen
                                </Button>
                            </Link>
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
