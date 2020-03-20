import React from 'react';
import Divider from '@material-ui/core/Divider';

export default function ErrorComponent() {

    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: 'column'}}>
            <h4>Die Seite konnte nicht gefunden werden</h4>
            <Divider />
            <h6>Leider konnte diese Seite nicht gefunden werden. Bitte verwenden Sie einen korrekten Link</h6>
        </div>
    );

}
