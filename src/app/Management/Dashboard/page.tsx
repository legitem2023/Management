"use client"
import React, { useEffect, useState } from 'react'
import DataManager from 'utils/DataManager'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import { Icon } from '@iconify/react'
import NumberOfViewVal from 'components/Management/ManagementStatistics/NumberOfViewVal'
import { useGlobalState } from 'state'
import TotalViews from 'components/Management/ManagementDashBoard/TotalViews'
import Loading from 'components/LoadingAnimation/Loading'

const Dashboard = () => {
  const Manager = new DataManager();
  const [useEmail] = useGlobalState("cookieEmailAddress");
  const [useLevel] = useGlobalState("cookieUserLevel");

  const { NumberOFViews, LoadingNumberOFViews } = Manager.NumberOfViews();
  const { NumberOFVisits, LoadingNumberOFVisits } = Manager.WebsiteVisit();

  const timestamp = new Date().getTime();
  if (LoadingNumberOFViews) return <Loading/>
  if (LoadingNumberOFVisits) return <Loading/>

  const todaysVisits = NumberOFVisits.getWebsitVisits.filter((item: any) => {
    const visited = new Date(item.dateVisited).getTime();
    const out = timestamp - visited;
    return out < 24 * 60 * 60 * 1000 && out >= 0 ? 1 : 0;
  }).length;

  const todaysViews = NumberOFViews.getNumberOfViews.filter((item: any) => {
    const visited = new Date(item.dateVisited).getTime();
    const out = timestamp - visited;
    return out < 24 * 60 * 60 * 1000 && out >= 0 ? 1 : 0;
  }).length;

  const today: any = new Date().toLocaleDateString();

  return (
    <div className='Main'>
      <div className='ManagementBody'>
        <Loading/>
        <ManagementHeader />
        <ManagementDrawer />
        <ManagementNavigation />
        <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='material-symbols:dashboard' /> Dashboard</div>
          <div className='Dashboard_grid'>
            <div className='StatisticsStat'>
              <div className='StatisticsStat_today_visits'>
                <div>Today Visits</div>
                <div className='StatIcon_container'>
                  <Icon className='StatIcon' icon='material-symbols:nest-doorbell-visitor-sharp' />
                </div>
                <div className='StatNumber'>
                  <NumberOfViewVal targetValue={todaysVisits} />
                </div>
              </div>
              <div className='StatisticsStat_total_visits'>
                <div>Total Visits</div>
                <div className='StatIcon_container'>
                  <Icon className='StatIcon' icon='material-symbols:nest-doorbell-visitor-sharp' />
                </div>
                <div className='StatNumber'>
                  <NumberOfViewVal targetValue={todaysVisits} />
                </div>
              </div>
              <div className='StatisticsStat_today_views'>
                <div>Today Views</div>
                <div className='StatIcon_container'>
                  <Icon className='StatIcon' icon='mdi:account-view-outline' />
                </div>
                <div className='StatNumber'>
                  <NumberOfViewVal targetValue={todaysViews} />
                </div>
              </div>
              <div className='StatisticsStat_total_views'>
                <div>Total Views</div>
                <div className='StatIcon_container'>
                  <Icon className='StatIcon' icon='mdi:account-view-outline' />
                </div>
                <div className='StatNumber'>
                   <TotalViews/>
                </div>
              </div>
            </div>
            <div>
              <div className='DashboardDetail'>
                <h1>Welcome</h1>
                <h3>{useLevel}</h3>
                <h3>【 {useEmail} 】</h3>
                <h3>Login Today :{today}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard