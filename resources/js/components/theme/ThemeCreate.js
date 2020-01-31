import React, {useState} from 'react';
import {
    Button,
    Grid,
    TextField
} from "@material-ui/core";

export default function ThemeCreate() {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const onSubmit = e => {

        title ? setTitleError(false) : setTitleError(true);
        description ? setDescriptionError(false) : setDescriptionError(true);

        // Fetch to create
        //console.log(title);
        //console.log(description);
    };

    return(
        <div>
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
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Button onClick={ () => onSubmit() } variant="contained" type="submit" color="primary">Speichern</Button>
                </Grid>
            </Grid>
        </div>
    );

}
