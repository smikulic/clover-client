import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:3003/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Dashboard />
        <Expenses />
      </div>
    </ApolloProvider>
  );
}

export default App;
