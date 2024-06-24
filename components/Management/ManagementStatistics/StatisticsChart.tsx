'use client'
import React from 'react'
import DataManager from 'utils/DataManager'
import StatisticsTab from './Tabs';
const StatisticsChart = () => {
  const Manager = new DataManager();
  const {NumberOFViews,LoadingNumberOFViews,ErrorNumberOFViews} = Manager.NumberOfViews();
  if(LoadingNumberOFViews) return 
  return (
    <div>
          <StatisticsTab/>
    </div>
  )
}

export default StatisticsChart