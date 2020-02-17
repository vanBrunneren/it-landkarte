import React from 'react';
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    Typography
} from "@material-ui/core";

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
