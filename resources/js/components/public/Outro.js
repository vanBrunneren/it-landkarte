import React from 'react';

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

export default function Outro() {

    return(
        <div>
            <div className={'intro-content-container'}>
                <Typography variant="h4" gutterBottom>
                    Informationen
                </Typography>
                <div className={'question-title-container'}>
                    <Typography variant="body1" gutterBottom style={{whiteSpace: 'pre-line'}}>
                        Damit wir uns optimal auf den Workshop mit Ihnen vorbereiten können, benötigen wir noch ein paar wenige Angaben von Ihnen.
                    </Typography>
                </div>
                <div container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id={"prename"}
                            name={"prename"}
                            label={"Vorname"}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id={"name"}
                            name={"name"}
                            label={"Name"}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id={"email"}
                            name={"email"}
                            label={"E-Mail Adresse"}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id={"phone"}
                            name={"phone"}
                            label={"Telefon-Nummer"}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id={"function"}
                            name={"function"}
                            label={"Position im Unternehmen"}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Unternehmensgrösse
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{whiteSpace: 'pre-line'}}>
                            Wie viele Mitarbeitende hat Ihr Unternehmen?
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup>
                                {['0-10', '11-50', '51-100', '101-200', '201-500'].map( nr => (
                                    <FormControlLabel
                                        key={nr}
                                        value={nr}
                                        control={<Radio />}
                                        label={nr}
                                        labelPlacement={"right"}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Und zum Schluss...
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{whiteSpace: 'pre-line'}}>
                            Haben Sie noch allgemeine Bemerkungen oder Ergänzungen, welche Ihnen für den Workshop von Bedeutung sind?
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={"8"}
                            label={"Bemerkungen"}
                            id={"comment"}
                            name={"comment"}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <div className={'outro-button-container'}>
                        <Button
                            onClick={() => props.history.push("/public/survey/" + props.match.params.hash + "/outro")}
                            variant="contained"
                            color="primary">
                            Umfrage absenden
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}
