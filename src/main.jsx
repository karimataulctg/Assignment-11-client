import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import MainLayout from './Layout/MainLayout.jsx';
import AuthProvider from './AuthProvider.jsx';
import Login from './mail/Login.jsx';
import Register from './mail/Register.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import AddBook from './pages/AddBook.jsx';
import Books from './pages/Books.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "/", 
        element: <Home></Home> },
        {
          path: "/login", 
          element: <Login></Login>,
        },
       {
        path: "register", 
        element: <Register></Register>,
       },
       {
        path: '/addBook',
        element: <AddBook></AddBook>
       },
       {
        path: 'books',
        element: <Books></Books>
       },
       {
        path: "*",
       element: <PageNotFound></PageNotFound>,
       },
       
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
