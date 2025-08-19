import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ApolloProvider } from '@apollo/client';
import { client } from './lib/ApolloClient';

import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
