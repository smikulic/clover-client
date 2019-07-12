import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

const Dashboard = () => (
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

			data.expenses.map(({ currency }) => {
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
					text: 'Currency Usability'
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
			
			return (
				<HighchartsReact
					highcharts={Highcharts}
					options={highchartsOptions}
				/>
			);
		}}
	</Query>
);

export default Dashboard;
