import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function NumberSelect(props) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        setValue(parseInt(event.target.value));
        props.setNumberSelect(parseInt(event.target.value));
    };

    const getSelectTextByKey = (key) => {
        return props.numberSelectTexts.find( selectText => selectText.key == key);
    };

    return(
        <div>
            <FormControl fullWidth component="fieldset">
                <RadioGroup
                    style={{justifyContent: 'space-between'}}
                    row
                    aria-label="answers"
                    name="answers"
                    value={value}
                    onChange={handleChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( nr => (
                        <FormControlLabel
                            key={nr}
                            value={nr}
                            control={<Radio />}
                            label={nr}
                            labelPlacement={"bottom"}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <Grid container justify="space-between">
                <Typography variant="body1" >{getSelectTextByKey("min").text}</Typography>
                <Typography variant="body1" >{getSelectTextByKey("max").text}</Typography>
            </Grid>
        </div>
    );

}
