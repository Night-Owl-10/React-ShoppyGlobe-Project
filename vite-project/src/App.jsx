import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import userContext from "./utils/userContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Provider store={appStore}>
    <userContext.Provider>
      <Header/>
      <Outlet/>
      <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </userContext.Provider>
    </Provider>
  )
}

export default App
