import React from 'react';
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";

export default function TextSelect(props) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        setValue(parseInt(event.target.value));
        props.setTextSelect(parseInt(event.target.value));
    };

    return(
        <div>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    {props.answerPossibilities.map( answer => (
                        <FormControlLabel key={answer.id} value={answer.id} control={<Radio />} label={answer.title} />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );

}
