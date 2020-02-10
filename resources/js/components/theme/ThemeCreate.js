import React, {useRef, useState} from 'react';
import {
    Button,
    Grid,
    TextField
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {createWithFile} from "../../actions/apiActions";

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

            createWithFile("themes", data)
                .then(response => {
                    setSuccessMessage("Die Änderungen wurden gespeichert!");
                    setIsLoading(false);
                });

        }

    };

    return(
        <div>
            { successMessage && <Alert severity="success">{successMessage}</Alert> }
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        error={titleError}
                        helperText={titleError ? "Bitte füllen Sie dieses Feld aus." : ""}
                        fullWidth
                        id={"title"}
                        name={"title"}
                        label="Titel"
                        margin="normal"
                        variant="filled"
                        onChange={ (e) => setTitle(e.target.value) }
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        error={descriptionError}
                        helperText={descriptionError ? "Bitte füllen Sie dieses Feld aus." : ""}
                        fullWidth
                        id={"description"}
                        name={"description"}
                        label="Beschreibung"
                        margin="normal"
                        variant="filled"
                        multiline
                        rows={"8"}
                        rowsMax="8"
                        onChange={ (e) => setDescription(e.target.value) }
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Button onClick={ () => onSubmit() } variant="contained" type="submit" color="primary">Speichern</Button>
                </Grid>
            </Grid>
        </div>
    );

}
