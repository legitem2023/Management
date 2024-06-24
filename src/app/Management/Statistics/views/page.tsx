"use client"
import React from 'react'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementStatistics from 'components/Management/ManagementStatistics/StatisticsChart'
import { Icon } from '@iconify/react'
import ManagementStatisticsSorts from 'components/Management/ManagementSearch/ManagementStatisticsSorts'
import ProductVisits from 'components/Management/ManagementStatistics/ProductVisits'
const Statistics = () => {
  return (
    <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader/>
          <ManagementDrawer/>
          <ManagementNavigation/>
          <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='mdi:graph-bar' /> Statistics</div>
            <ManagementStatisticsSorts/>
            <ProductVisits/>
          </div>
        </div>
    </div>
  )
}

export default Statistics