import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { StoreProvider } from "./Store";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: 'http://localhost:5555/graphql',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>,
);
