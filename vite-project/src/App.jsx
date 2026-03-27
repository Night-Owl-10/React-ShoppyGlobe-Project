import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isApiRequest = config.url.startsWith(import.meta.env.VITE_API_URL) || config.url.startsWith("http://localhost:3000") || !config.url.startsWith("http");
  const isCloudinary = config.url.includes("cloudinary.com");

  if (token && isApiRequest && !isCloudinary) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {

  //ShoppyGlobe Project

  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
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
      </CartProvider>
    </AuthProvider>
  )
}

export default App
