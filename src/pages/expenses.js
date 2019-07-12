import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const Expenses = () => (
	<Query
		query={gql`
			{
				expenses {
					id
					value
					currency
					description
					date
				}
			}
		`}
	>
		{({ loading, error, data }) => {
			console.log(data)
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;
			

			return data.expenses.map(({ id, value, currency, description, date }) => (
				<div key={id}>
					<p>{value}: {currency}</p>
					<p>{description}</p>
					<p>{date}</p>
				</div>
			));
		}}
	</Query>
);

export default Expenses;
