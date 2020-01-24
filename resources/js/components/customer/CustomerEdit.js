import React, {useEffect, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import {CircularProgress} from "@material-ui/core";

export default function CustomerEdit(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[customer, setCustomer] = useState([]);

    useEffect( () => {
        fetch('/api/customers/' + props.match.params.id)
            .then(response => response.json())
            .then(jsonResponse => {
                setIsLoading(false);
                setCustomer(jsonResponse);
                console.log(jsonResponse);
            });
    }, []);

    return (
        <div>
            {isLoading && <CircularProgress />}

            {customer &&
                <div>
                    {customer.name}
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        value={customer.name}
                        defaultValue={customer.name}/>
                </div>
            }

        </div>
    );

}
