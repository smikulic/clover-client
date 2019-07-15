import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

const Dashboard = ({ highchartsOptions }) => (
	<HighchartsReact
		highcharts={Highcharts}
		options={highchartsOptions}
	/>
);

export default Dashboard;
