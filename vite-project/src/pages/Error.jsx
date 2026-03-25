import { useRouteError } from "react-router-dom";
import "./Error.css";

function Error() {

    const err = useRouteError();
    console.log(err);

    return (
        <div className="error-container">
            <h1>{"><"} {err.status}</h1>
            <h1>{err.statusText}</h1>
            <br />
            <h2>Incorrect path entered. Please enter correct path</h2>

        </div>
    );
}

export default Error;

