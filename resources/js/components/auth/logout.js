import React, { useEffect } from 'react';

export default function LogoutHelper() {

    useEffect( () => {
       window.location.reload();
    }, []);

    return <div></div>;

}
