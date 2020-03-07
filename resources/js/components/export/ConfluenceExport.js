import React from 'react';

export default function ConfluenceExport() {

    const clickButton = async () => {
        try {
            let res = await axios.get(
                'https://pascalbrunner.atlassian.net/wiki/rest/api/space',
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Basic ' + btoa('pbrunner1931@gmail.com:1cO8SZDhwqohzCtcA0JX116D')
                    }
                }
            );
            console.log(res);
        } catch(err) {
            console.error(err);
        }
    };

    return(
        <div>
            <button onClick={clickButton}>Make Export</button>
        </div>
    )

}
