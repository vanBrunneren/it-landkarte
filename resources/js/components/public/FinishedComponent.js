import React from 'react';
import Divider from "@material-ui/core/Divider";

export default function FinishedComponent() {

    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: 'column'}}>
            <h4>Die Umfrage wurde erfolgreich abgesendet</h4>
            <Divider />
            <h6>Ihre Umfrage wurde abgeschlossen und die Daten werden nun ausgewertet</h6>
        </div>
    );

}
