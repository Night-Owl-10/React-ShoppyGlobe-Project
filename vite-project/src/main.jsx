import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from 'react';
import Error from './pages/Error.jsx';
import "./main.css"

const ProductList = lazy(() => import('./pages/ProductList.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Loading...</div>}><ProductList /></Suspense>
      },

      {
        path: "/cart",
        element: <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Loading...</div>}><Cart /></Suspense>
      },

      {
        path: "/signup",
        element: <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Loading...</div>}><SignUp /></Suspense>
      },

      {
        path: "/product/:id",
        element: <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Loading...</div>}><ProductDetail /></Suspense>
      },

      {
        path: "/profile",
        element: <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Loading...</div>}><Profile /></Suspense>
      },

    ],
    errorElement: <Error />
  },


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
