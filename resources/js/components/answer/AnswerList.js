import React, {useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchAll} from "../../actions/apiActions";

export default function AnswerList() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {

        fetchAll('answers')
            .then( answers => {
                console.log(answers);
                setIsLoading(false);
            });

    }, []);

    return(
        <div>
            {isLoading && <CircularProgress />}

            AnswerList
        </div>
    )

}
