import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";

export default function TextFieldAnswer(props) {

    const [value, setValue] = useState("");

    const setTextFieldAnswer = (textFieldValue) => {
        setValue(textFieldValue);
        props.setTextFieldAnswer(textFieldValue);
    };

    useEffect( () => {
        if(props.answer && props.answer.text_answer) {
            setValue(props.answer.text_answer);
        }
    }, [props.answer]);

    return(
        <div style={{width: '100%'}}>
            {props.textInputFields.map( field => (
                <TextField
                    key={field.id}
                    name={"field_1"}
                    value={value}
                    onChange={ e => setTextFieldAnswer(e.target.value) }
                    fullWidth
                    id={field.title}
                    label={field.title}
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }} />
            ))
            }
        </div>
    );

}
