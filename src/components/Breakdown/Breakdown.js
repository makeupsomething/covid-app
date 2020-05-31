import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Wrapper = styled.div`
	height: 300px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	color: white;
`;

const Header = styled.h3`
	margin: 0;
	margin-top: 8px;
	font-size: 1.3rem;
	font-weight: bolder;
	text-decoration: underline;
`;

const Legend = styled.div`
	font-size: 1.3rem;
	font-weight: bolder;
	text-decoration: underline;
	margin-top: 16px;
`;

const Breakdown = (props) => {
	const {
		currentStateDataNo2,
		currentStateDataOzone,
		currentStateDataAerosol,
		currentSelectedDate,
		currentSelectedState,
	} = props;
	const [currentDataNo2, setCurrentDataNo2] = useState();
	const [currentDataOzone, setCurrentDataOzone] = useState();
	const [currentDataAerosol, setCurrentDataAerosol] = useState();

	useEffect(() => {
		if (currentSelectedDate) {
			setCurrentDataNo2(
				currentStateDataNo2.find(
					(data) =>
						`${data.Date}` ===
						dayjs(currentSelectedDate)
							.format('YYYYMMDD')
							.toString(),
				),
			);

			setCurrentDataOzone(
				currentStateDataOzone.find(
					(data) =>
						`${data.Date}` ===
						dayjs(currentSelectedDate)
							.format('YYYYMMDD')
							.toString(),
				),
			);

			setCurrentDataAerosol(
				currentStateDataAerosol.find(
					(data) =>
						`${data.Date}` ===
						dayjs(currentSelectedDate)
							.format('YYYYMMDD')
							.toString(),
				),
			);
		}
	}, [
		currentSelectedDate,
		currentStateDataNo2,
		currentStateDataOzone,
		currentStateDataAerosol,
	]);

	const getStatus = (value) => {
		let status = 'High';

		if (value < 0) {
			status = 'Low';
		} else if (status > 0 && status < 1.2) {
			status = 'Medium';
		}
		return status;
	};

	const getImportance = (name) => {
		const { feat1, feat2, feat3, feat4, feat5 } = currentDataNo2;
		if (name === feat1) {
			return 1;
		} else if (name === feat2) {
			return 2;
		} else if (name === feat3) {
			return 3;
		} else if (name === feat4) {
			return 4;
		} else if (name === feat5) {
			return 5;
		} else {
			return 0;
		}
	};

	return (
		<Wrapper>
			{currentSelectedState && currentSelectedDate && currentDataNo2 && (
				<h2>
					Predicted Cases for {currentSelectedState} on{' '}
					{currentSelectedDate}: {currentDataNo2.Pred}
				</h2>
			)}
			<div>
				{currentDataNo2 && (
					<>
						<Header>N02 - Normalized</Header>
						<div>
							Mean: {currentDataNo2.Mean.toFixed(3)} -{' '}
							{getStatus(currentDataNo2.Mean)}{' '}
							{getImportance('no2_mean') > 0 && (
								<> - Importance - {getImportance('no2_mean')}</>
							)}
						</div>
						<div>
							Median: {currentDataNo2.Median.toFixed(3)} -{' '}
							{getStatus(currentDataNo2.Median)}{' '}
							{getImportance('no2_median') > 0 && (
								<>
									{' '}
									- Importance - {getImportance('no2_median')}
								</>
							)}
						</div>
						<div>
							Min: {currentDataNo2.Min.toFixed(3)} -{' '}
							{getStatus(currentDataNo2.Min)}{' '}
							{getImportance('no2_min') > 0 && (
								<> - Importance - {getImportance('no2_min')}</>
							)}
						</div>
						<div>
							Max: {currentDataNo2.Max.toFixed(3)} -{' '}
							{getStatus(currentDataNo2.Max)}{' '}
							{getImportance('no2_max') > 0 && (
								<> - Importance - {getImportance('no2_max')}</>
							)}
						</div>
					</>
				)}
			</div>
			<div>
				{currentDataOzone && (
					<>
						<Header>Ozone - Normalized</Header>
						<div>
							Mean: {currentDataOzone.Mean.toFixed(3)} -{' '}
							{getStatus(currentDataOzone.Mean)}{' '}
							{getImportance('ozone_mean') > 0 && (
								<>
									{' '}
									- Importance - {getImportance('ozone_mean')}
								</>
							)}
						</div>
						<div>
							Median: {currentDataOzone.Median.toFixed(3)} -{' '}
							{getStatus(currentDataOzone.Median)}{' '}
							{getImportance('ozone_median') > 0 && (
								<>
									{' '}
									- Importance -{' '}
									{getImportance('ozone_median')}
								</>
							)}
						</div>
						<div>
							Min: {currentDataOzone.Min.toFixed(3)} -{' '}
							{getStatus(currentDataOzone.Min)}{' '}
							{getImportance('ozone_min') > 0 && (
								<>
									{' '}
									- Importance - {getImportance('ozone_min')}
								</>
							)}
						</div>
						<div>
							Max: {currentDataOzone.Max.toFixed(3)} -{' '}
							{getStatus(currentDataOzone.Max)}{' '}
							{getImportance('ozone_max') > 0 && (
								<>
									{' '}
									- Importance - {getImportance('ozone_max')}
								</>
							)}
						</div>
					</>
				)}
			</div>
			<div>
				{currentDataAerosol && (
					<>
						<Header>Aerosol - Normalized</Header>
						<div>
							Mean: {currentDataAerosol.Mean.toFixed(3)} -{' '}
							{getStatus(currentDataAerosol.Mean)}{' '}
							{getImportance('aerosol_mean') > 0 && (
								<>
									{' '}
									- Importance -{' '}
									{getImportance('aerosol_mean')}
								</>
							)}
						</div>
						<div>
							Median: {currentDataAerosol.Median.toFixed(3)} -{' '}
							{getStatus(currentDataAerosol.Median)}{' '}
							{getImportance('aerosol_median') > 0 && (
								<>
									{' '}
									- Importance -{' '}
									{getImportance('aerosol_median')}
								</>
							)}
						</div>
						<div>
							Min: {currentDataAerosol.Min.toFixed(3)} -{' '}
							{getStatus(currentDataAerosol.Min)}{' '}
							{getImportance('aerosol_min') > 0 && (
								<>
									{' '}
									- Importance -{' '}
									{getImportance('aerosol_min')}
								</>
							)}
						</div>
						<div>
							Max: {currentDataAerosol.Max.toFixed(3)} -{' '}
							{getStatus(currentDataAerosol.Max)}{' '}
							{getImportance('aerosol_max') > 0 && (
								<>
									{' '}
									- Importance -{' '}
									{getImportance('aerosol_max')}
								</>
							)}
						</div>
					</>
				)}
			</div>
			<Legend>
				Feature importance 1-5 are the 5 most important values in
				determining the predition
			</Legend>
		</Wrapper>
	);
};

export default Breakdown;
