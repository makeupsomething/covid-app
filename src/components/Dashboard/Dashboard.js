import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ActivityChart from '../Charts/ActivityChart';
import ConfirmedChart from '../Charts/ConfirmedChart';
import PredictedChart from '../Charts/PredictedChart';
import Map from '../Map';
import Breakdown from '../Breakdown';
import featureData from './data/activity/csvjson.json';

const Layout = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 100px 500px 1fr;
	grid-column-gap: 16px;
	grid-row-gap: 16px;
	align-items: center;
	width: 100%;
	height: 100vh;
	padding: 1rem;
	padding-right: 2rem;
	overflow-x: hidden;
	box-sizing: border-box;
	grid-template-areas:
		'header header'
		'map breakdown'
		'charts charts';
`;

const HeaderContainer = styled.div`
	grid-area: header;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	justify-self: center;
	color: white;
	box-sizing: border-box;

	h1 {
		font-size: 2rem;
	}
`;

const MapWrapper = styled.div`
	grid-area: map;
	height: 100%;
	width: 100%;
	justify-self: center;
	box-sizing: border-box;
`;

const BreakdownWrapper = styled.div`
	grid-area: breakdown;
	color: white;
	height: 100%;
	width: 100%;
	justify-self: center;
	border: 3px solid white;
	border-radius: 13px;
	box-sizing: border-box;
	padding: 1rem;

	h2 {
		font-size: 1.5rem;
	}
`;

const ChartWrapper = styled.div`
	grid-area: charts;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	box-sizing: border-box;
`;

const Dashboard = () => {
	const [currentSelectedState, setCurrentSelectedState] = useState(
		'New York',
	);
	const [currentSelectedDate, setCurrentSelectedDate] = useState();
	const [currentStateDataNo2, setCurrentStateDataNo2] = useState();
	const [currentStateDataOzone, setCurrentStateDataOzone] = useState();
	const [currentStateDataAerosol, setCurrentStateDataAerosol] = useState();

	useEffect(() => {
		if (currentSelectedState) {
			const stateData = featureData.filter(
				(data) => data.AOI === currentSelectedState,
			);
			setCurrentStateDataNo2(
				stateData.filter((data) => data.Type === 'no2'),
			);
			setCurrentStateDataOzone(
				stateData.filter((data) => data.Type === 'ozone'),
			);
			setCurrentStateDataAerosol(
				stateData.filter((data) => data.Type === 'aerosol'),
			);
		}
	}, [currentSelectedState]);

	return (
		<Layout>
			<HeaderContainer>
				<h1>Covid-19 Cluster Prediction</h1>
				<p>
					Using No2, Ozone and Aerosol data we try to see if we can
					predict where a COVID-19 outbreak might occur
				</p>
			</HeaderContainer>
			<MapWrapper>
				<Map setCurrentSelectedState={setCurrentSelectedState} />
			</MapWrapper>
			<BreakdownWrapper>
				<Breakdown
					currentSelectedState={currentSelectedState}
					currentStateDataNo2={currentStateDataNo2}
					currentStateDataOzone={currentStateDataOzone}
					currentStateDataAerosol={currentStateDataAerosol}
					currentSelectedDate={currentSelectedDate}
				/>
			</BreakdownWrapper>
			<ChartWrapper>
				<ActivityChart
					refId="activity-chart"
					currentStateDataNo2={currentStateDataNo2}
					currentStateDataOzone={currentStateDataOzone}
					currentStateDataAerosol={currentStateDataAerosol}
					setCurrentSelectedDate={setCurrentSelectedDate}
				/>
				<ConfirmedChart
					refId="confirmed-chart"
					setCurrentSelectedDate={setCurrentSelectedDate}
					currentStateDataConfirmed={currentStateDataNo2}
				/>
				<PredictedChart
					refId="predicted-chart"
					setCurrentSelectedDate={setCurrentSelectedDate}
					currentStateDataConfirmed={currentStateDataNo2}
				/>
			</ChartWrapper>
		</Layout>
	);
};

export default Dashboard;
