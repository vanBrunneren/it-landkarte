import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

export default function TextFieldAnswer(props) {

    const [value, setValue] = useState("");

    return(
        <div style={{width: '100%'}}>
            {props.textInputFields.map( field => (
                <TextField
                    key={field.id}
                    name={"field_1"}
                    value={value}
                    onChange={ e => setValue(e.target.value) }
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
