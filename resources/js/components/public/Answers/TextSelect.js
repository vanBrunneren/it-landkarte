import React, {useEffect} from 'react';

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

export default function TextSelect(props) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        setValue(parseInt(event.target.value));
        props.setTextSelect(parseInt(event.target.value));
    };

    useEffect( () => {
        if(props.answer && props.answer.number_answer) {
            setValue(props.answer.number_answer);
        }
    }, [props.answer]);

    return(
        <div className={'text-select-container'}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    {props.answerPossibilities.map( answer => (
                        <FormControlLabel
                            key={answer.id}
                            value={answer.id}
                            control={<Radio />}
                            label={answer.title} />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );

}
