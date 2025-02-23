import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from 'react';
import Error from './components/Error.jsx';
import "./main.css"

const ProductList = lazy(() => import('./components/ProductList.jsx'));
const Cart = lazy(() => import('./components/Cart.jsx'));
const Checkout = lazy(() => import('./components/Checkout.jsx'));
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<div>Loading...</div>}><ProductList/></Suspense>
      },

      {
        path: "/cart",
        element: <Suspense fallback={<div>Loading...</div>}><Cart/></Suspense>
      },

      {
        path: "/checkout",
        element: <Suspense fallback={<div>Loading...</div>}><Checkout/></Suspense>
      },

      {
        path: "/product/:id",
        element: <Suspense fallback={<div>Loading...</div>}><ProductDetail/></Suspense>
      },

      
    ],
    errorElement: <Error/>
  },

 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
