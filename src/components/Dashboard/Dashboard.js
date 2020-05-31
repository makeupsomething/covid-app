import React, { useState } from 'react';
import CalenderChart from '../CalenderChart';
import Map from '../Map';

const Dashboard = () => {
	const [currentSelectedState, setCurrentSelectedState] = useState();
	return (
		<>
			{currentSelectedState && <p>Data for: {currentSelectedState}</p>}
			<Map setCurrentSelectedState={setCurrentSelectedState} />
			<CalenderChart refId="chart-1" />
			<CalenderChart refId="chart-2" />
			<CalenderChart refId="chart-3" />
		</>
	);
};

export default Dashboard;
