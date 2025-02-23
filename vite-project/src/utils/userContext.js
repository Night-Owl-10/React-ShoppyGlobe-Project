import { createContext } from "react";

const userContext = createContext({
    loggedInUser:  "Dummy User",
});

export default userContext;