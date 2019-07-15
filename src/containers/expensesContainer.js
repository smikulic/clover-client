import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Expenses from "../pages/expenses";

const ExpensesContainer = () => (
	<Query
		query={gql`
			{
				expenses {
					id
					value
					currency
                    description
                    mainCategory
					date
				}
				categories {
					id
					name
					mainCategory
				  }
			}
		`}
	>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			const mainCategories = data.categories.filter(category => category.mainCategory === '')
            
            return <Expenses mainCategories={mainCategories} expenses={data.expenses} />
		}}
	</Query>
);

export default ExpensesContainer;
