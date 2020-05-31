import React, { useState, useEffect } from 'react';
import ActivityChart from '../Charts/ActivityChart';
import ConfirmedChart from '../Charts/ConfirmedChart';
import PredictedChart from '../Charts/PredictedChart';
import Map from '../Map';
import Breakdown from '../Breakdown';
import featureData from './data/activity/csvjson.json';

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
		<>
			{currentSelectedState && currentSelectedDate && (
				<p>
					Data for: {currentSelectedState} on {currentSelectedDate}
				</p>
			)}
			<Map setCurrentSelectedState={setCurrentSelectedState} />
			<Breakdown
				currentStateDataNo2={currentStateDataNo2}
				currentStateDataOzone={currentStateDataOzone}
				currentStateDataAerosol={currentStateDataAerosol}
				currentSelectedDate={currentSelectedDate}
			/>
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
		</>
	);
};

export default Dashboard;
