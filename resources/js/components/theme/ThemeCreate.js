import React, {useRef, useState} from 'react';
import {
    Button,
    Grid,
    TextField
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function ThemeCreate() {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const fileInput = useRef(null);
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = e => {

        setIsLoading(true);

        title ? setTitleError(false) : setTitleError(true);
        description ? setDescriptionError(false) : setDescriptionError(true);

        if(title && description) {

            setTitle(title);
            setDescription(description);

            const data = new FormData();
            data.append('file', fileInput.current.files[0]);
            data.append('title', title);
            data.append('description', description);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            axios.post('/api/themes', data, config)
                .then(response => {
                    setSuccessMessage("Die Änderungen wurden gespeichert!");
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error);
                });

        }

    };

    return(
        <div>
            { successMessage && <Alert severity="success">{successMessage}</Alert> }
            <TextField
                required
                error={titleError}
                helperText={titleError ? "Bitte füllen Sie dieses Feld aus." : ""}
                fullWidth
                id={"title"}
                name={"title"}
                label="Titel"
                margin="normal"
                variant="outlined"
                onChange={ (e) => setTitle(e.target.value) }
                InputLabelProps={{
                    shrink: true,
                }} />
            <TextField
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
                onChange={ (e) => setDescription(e.target.value) }
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
                    <Button onClick={ () => onSubmit() } variant="contained" type="submit" color="primary">Speichern</Button>
                </Grid>
            </Grid>
        </div>
    );

}
