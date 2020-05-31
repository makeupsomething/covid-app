import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/calendar';
import 'echarts/lib/component/visualMap';

const Header = styled.h2`
	color: white;
	margin-bottom: 0px;
`;

const ChartContainer = styled.div`
	width: 1200px;
	height: 200px;
`;

const ConfirmedChart = (props) => {
	const { refId, setCurrentSelectedDate, currentStateDataConfirmed } = props;

	useLayoutEffect(() => {
		if (currentStateDataConfirmed && setCurrentSelectedDate) {
			const sortedConfirmed = currentStateDataConfirmed.sort(
				(a, b) => a.Date - b.Date,
			);

			const parseData = () => {
				return sortedConfirmed.map((data) => {
					return [
						dayjs(`${data.Date}`, 'YYYYMMDD').format('YYYY-MM-DD'),
						data.Gt,
					];
				});
			};

			const myChart = echarts.init(document.getElementById(refId));
			const min = Math.min(...sortedConfirmed.map((data) => data.Gt));
			const max = Math.max(...sortedConfirmed.map((data) => data.Gt));

			const option = {
				grid: {
					top: 0,
					bottom: 0,
				},
				visualMap: {
					show: false,
					min,
					max,
				},
				tooltip: {},
				calendar: {
					range: '2020',
				},
				series: {
					type: 'heatmap',
					coordinateSystem: 'calendar',
					data: parseData(),
					markPoint: {
						itemStyle: {
							borderColor: 'green',
						},
					},
				},
			};
			myChart.setOption(option);
			myChart.on('click', function (params) {
				const {
					value: [date],
				} = params;
				setCurrentSelectedDate(date);
			});
		}
	}, [setCurrentSelectedDate, currentStateDataConfirmed, refId]);

	return (
		<>
			<Header>Confirmed Cases</Header>
			<ChartContainer id={refId} />
		</>
	);
};

export default ConfirmedChart;
