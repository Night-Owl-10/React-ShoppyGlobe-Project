import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import userContext from "./utils/userContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {

  return (
    <Provider store={appStore}>
    <userContext.Provider>
      <Header/>
      <Outlet/>
    </userContext.Provider>
    </Provider>
  )
}

export default App
