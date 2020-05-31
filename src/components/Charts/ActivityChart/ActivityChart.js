import React, { useLayoutEffect } from 'react';
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

const ActivityChart = (props) => {
	const {
		refId,
		currentStateDataNo2,
		currentStateDataOzone,
		currentStateDataAerosol,
		setCurrentSelectedDate,
	} = props;
	useLayoutEffect(() => {
		if (
			currentStateDataNo2 &&
			currentStateDataOzone &&
			setCurrentSelectedDate
		) {
			const parseData = () => {
				const data = [];
				let mostRecentDate = null;

				const sortedNo2 = currentStateDataNo2.sort(
					(a, b) => a.Date - b.Date,
				);

				for (let i = 0; i < sortedNo2.length; i++) {
					if (sortedNo2[i]) {
						const ozoneData = currentStateDataOzone.find(
							(data) => data.Date === sortedNo2[i].Date,
						);
						const aerosolData = currentStateDataAerosol.find(
							(data) => data.Date === sortedNo2[i].Date,
						);

						if (sortedNo2[i] && ozoneData && aerosolData) {
							if (
								sortedNo2[i].Date === ozoneData.Date &&
								aerosolData.Date === ozoneData.Date
							) {
								data.push([
									dayjs(
										`${sortedNo2[i].Date}`,
										'YYYYMMDD',
									).format('YYYY-MM-DD'),
									sortedNo2[i].Min +
										ozoneData.Min +
										aerosolData.Min,
								]);
								mostRecentDate = dayjs(
									`${sortedNo2[i].Date}`,
									'YYYYMMDD',
								).format('YYYY-MM-DD');
							}
						}
					}
				}
				setCurrentSelectedDate(mostRecentDate);
				return data;
			};

			const myChart = echarts.init(document.getElementById(refId));

			const option = {
				grid: {
					top: 0,
					bottom: 0,
				},
				visualMap: {
					show: false,
					min: -3,
					max: 3,
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
	}, [
		refId,
		currentStateDataNo2,
		currentStateDataAerosol,
		currentStateDataOzone,
		setCurrentSelectedDate,
	]);

	return (
		<>
			<Header>Activiy</Header>
			<ChartContainer id={refId} />
		</>
	);
};

export default ActivityChart;
