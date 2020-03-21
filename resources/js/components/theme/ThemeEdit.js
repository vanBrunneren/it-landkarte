import React, {useEffect, useRef, useState} from 'react';

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Alert from '@material-ui/lab/Alert';
import {fetchSingle, updateWithFile} from "../../actions/apiActions";

export default function ThemeEdit(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const fileInput = useRef(null);

    useEffect( () => {

        fetchSingle("themes", props.match.params.id)
            .then( theme => {
                setTitle(theme.title);
                setDescription(theme.description);
                setIsLoading(false);
            });

    }, [props.match.params.id]);

    const onSubmit = async (e) => {

        setIsLoading(true);

        title ? setTitleError(false) : setTitleError(true);
        description ? setDescriptionError(false) : setDescriptionError(true);

        if(title && description) {

            const data = new FormData();
            data.append('file', fileInput.current.files[0]);
            data.append('title', title);
            data.append('description', description);

            updateWithFile("themes", data, props.match.params.id)
                .then(response => {
                    setSuccessMessage("Die Änderungen wurden gespeichert!");
                    setIsLoading(false);
                });

        }

    };

    return(
        <div>
            {isLoading && <CircularProgress />}
            {successMessage && <Alert severity="success">{successMessage}</Alert> }
            {!isLoading &&
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                value={title}
                                required
                                fullWidth
                                id={"title"}
                                name={"title"}
                                label="Titel"
                                margin="normal"
                                variant="filled"
                                onChange={(e) => setTitle(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={description}
                                fullWidth
                                id={"description"}
                                name={"description"}
                                label="Beschreibung"
                                margin="normal"
                                variant="filled"
                                multiline
                                rows={"8"}
                                rowsMax="8"
                                onChange={(e) => setDescription(e.target.value)}
                                InputLabelProps={{
                                shrink: true,
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                component="label">
                                Introbild hochladen
                                <input
                                    ref={fileInput}
                                    type="file"
                                    style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <img
                                style={{height: '250px'}}
                                src={"/api/themes/" + props.match.params.id + "/image"} />
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
