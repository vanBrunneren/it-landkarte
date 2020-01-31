import React, {useEffect, useRef, useState} from 'react';
import {
    Button, CircularProgress,
    Grid,
    TextField
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';

export default function ThemeEdit(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const fileInput = useRef(null);

    useEffect( () => {

        axios.get('/api/themes/' + props.match.params.id)
            .then( response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setIsLoading(false);
            })
            .catch( error => {
                console.error(error);
                setIsLoading(false);
            });

    }, [props.match.params.id]);

    const onSubmit = async (e) => {

        title ? setTitleError(false) : setTitleError(true);
        description ? setDescriptionError(false) : setDescriptionError(true);

        if(title && description) {

            const data = new FormData();
            data.append('file', fileInput.current.files[0]);
            data.append('title', title);
            data.append('description', description);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            axios.post('/api/themes/' + props.match.params.id, data, config)
                .then(response => console.log(response));

            /*
            axios.put('/api/themes/' + props.match.params.id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    setSuccessMessage("Die Änderungen wurden gespeichert!");
                })
                .catch(error => {
                    console.error(error);
                });

             */
        }

        // Fetch to create
        //console.log(title);
        //console.log(description);
    };

    return(
        <div>

            {isLoading && <CircularProgress />}

            {!isLoading &&
                <div>
                    { successMessage && <Alert severity="success">{successMessage}</Alert> }
                    <TextField
                        value={title}
                        required
                        error={titleError}
                        helperText={titleError ? "Bitte füllen Sie dieses Feld aus." : ""}
                        fullWidth
                        id={"title"}
                        name={"title"}
                        label="Titel"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setTitle(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <TextField
                        value={description}
                        required
                        error={descriptionError}
                        helperText={descriptionError ? "Bitte füllen Sie dieses Feld aus." : ""}
                        fullWidth
                        id={"description"}
                        name={"description"}
                        label="Beschreibung"
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={"8"}
                        rowsMax="8"
                        onChange={(e) => setDescription(e.target.value)}
                        InputLabelProps={{
                        shrink: true,
                    }} />
                    <Button
                        variant="contained"
                        component="label">
                        Introbild hochladen
                        <input
                            ref={fileInput}
                            type="file"
                            style={{ display: "none" }} />
                    </Button>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Button onClick={() => onSubmit()} variant="contained" type="submit" color="primary">Speichern</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );

}
