import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Dashboard from '../pages/dashboard';

const DashboardContainer = () => (
	<Query
		query={gql`
			{
				expenses {
					id
					currency
					date
				}
			}
		`}
	>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			let seriesData = [];
			let currencyDataSet = {};

			data.expenses.forEach(({ currency }) => {
				let singleItemPercentage = 1 / data.expenses.length * 100;

				if (currencyDataSet[currency]) {
					currencyDataSet[currency] = currencyDataSet[currency] + singleItemPercentage;
				} else {
					currencyDataSet[currency] = singleItemPercentage;
				}
			})

			for (var key in currencyDataSet) {
				seriesData.push({
					name: key,
					y: currencyDataSet[key]
				})
			}

			seriesData[0]['sliced'] = true;
			seriesData[0]['selected'] = true;

			const highchartsOptions = {
				// options - see https://api.highcharts.com/highcharts
				title: {
					text: ''
				},
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				series: [{
					name: 'Currencies',
					colorByPoint: true,
					data: seriesData,
				}]
			};
			
			return <Dashboard highchartsOptions={highchartsOptions} />;
		}}
	</Query>
);

export default DashboardContainer;
