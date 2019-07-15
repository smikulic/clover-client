import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import DashboardContainer from "./containers/dashboardContainer";
import ExpensesContainer from "./containers/expensesContainer";
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:3003/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DashboardContainer />
        <ExpensesContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
