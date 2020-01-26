import React, {useEffect, useState} from 'react';
import {CircularProgress} from "@material-ui/core";

export default function PersonEdit(props) {

    const[isLoading, setIsLoading] = useState(true);
    const[person, setPerson] = useState([]);

    useEffect( () => {

        fetch('/api/persons/' + props.match.params.personId)
            .then( response => response.json())
            .then( jsonResponse => {
                console.log(jsonResponse);
                setPerson(jsonResponse);
                setIsLoading(false);
            });

    }, [props.match.params.personId])

    return(
        <div>
            {isLoading && <CircularProgress />}

            {person &&
                <div>
                    <p>{person.prename}</p>
                    <p>{person.name}</p>
                </div>
            }
        </div>
    );

}
