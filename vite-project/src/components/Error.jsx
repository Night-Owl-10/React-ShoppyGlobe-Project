import { useRouteError } from "react-router-dom";

function Error() {

    const err = useRouteError();
    console.log(err);

    return(
        <>
        <h1>{"><"} {err.status}</h1>
        <h1>{err.statusText}</h1>
        <br/>
        <h2>Incorrect path entered. Please enter correct path</h2>
        
        </>
    );
}

export default Error;

