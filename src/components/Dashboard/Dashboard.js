import React from 'react'
import CalenderChart from '../CalenderChart'

const Dashboard = () => {
    return (
        <>
            <CalenderChart refId='chart-1'/>
            <CalenderChart refId='chart-2'/>
            <CalenderChart refId='chart-3'/>
        </>
    )
}

export default Dashboard