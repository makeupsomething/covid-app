import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const Breakdown = (props) => {
	const {
		currentStateDataNo2,
		currentStateDataOzone,
		currentStateDataAerosol,
		currentSelectedDate,
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
    }, [currentSelectedDate, currentStateDataNo2]);
    
    useEffect(() => {
        console.log(currentDataNo2)
    }, [currentDataNo2])
	return (<div>
        {currentDataNo2 && <div>NO2: {currentDataNo2.Normalisation}</div>}
        {currentDataOzone && <div>Ozone: {currentDataOzone.Normalisation}</div>}
        {currentDataAerosol && <div>Aerosol: {currentDataAerosol.Normalisation}</div>}
    </div>);
};

export default Breakdown;
