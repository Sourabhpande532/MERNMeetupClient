// Parent/main 
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DetailsEvent } from './component/DetailsEvent';
import { Layout } from './component/Layout';
// import { useState } from 'react';
import reportWebVitals from './reportWebVitals';

const Root = () => {
  // Shared states for both component
  const [search, setSearch] = useState( "" );
  const [type, setType] = useState( "Both" );

  const router = createBrowserRouter( [
    {
      element: <Layout search={ search } setSearch={ setSearch } type={ type } setType={ setType } />,
      children: [
        { path: "/", element: <App search={ search } setSearch={ setSearch } type={ type } setType={ setType } /> },
        { path: "/details/:eventId", element: <DetailsEvent search={ search } setSearch={ setSearch } /> }
      ]
    },
  ] );
  return <RouterProvider router={router}/>
}

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
