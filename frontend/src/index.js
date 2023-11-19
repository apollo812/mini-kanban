import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { StoreProvider } from "./Store";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: '',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
