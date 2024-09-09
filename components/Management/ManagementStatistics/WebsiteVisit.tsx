'use client'
import React, { useState } from 'react'
import DataManager from 'utils/DataManager'
import StatisticsTab from './Tabs';
import { useGlobalState } from 'state';
import StatisticsPagination from './StatisticsPagination';
const WebsiteVisit = () => {
  const Manager = new DataManager();
  const {NumberOFVisits,LoadingNumberOFVisits,ErrorNumberOFViews} = Manager.WebsiteVisit();
  const [currentFromDate] = useGlobalState("fromDate");
  const [currenttoDate] = useGlobalState("toDate");
  const [currentItemPerpage]:any = useGlobalState("ItemPerpage");
  const [currentAgentPerpage] = useGlobalState("AgentPerpage");
  const [useInitSlice] = useGlobalState("setInitSlice");
  const [pagination_currentPageCount, pagination_setCurrentPageCount] = useState(30);
  if(LoadingNumberOFVisits) return 


  const convertedCurrentPage = (currentItemPerpage !== "All" ? parseInt(currentItemPerpage) : currentItemPerpage);
  let itemsPerPage:any = convertedCurrentPage;
  let currentPage = useInitSlice; // Display the second page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const totalItems = NumberOFVisits.getWebsitVisits.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);


  return (
    <div>
        <StatisticsTab/>
        <div className='Pagination'>
          {<StatisticsPagination InitSlice={useInitSlice} Pages={totalPages}></StatisticsPagination>}
        </div>
        <div  className='ProductVisitsTable ProductVisitsTableTH'>
          <div>Product Code</div>
          <div>Email Address</div>
          <div>IP Address</div>
          <div>Country</div>
          <div>Date Visited</div>
        </div>
      {NumberOFVisits.getWebsitVisits.map((item:any,idx:any)=>(
        <div key={idx} className='ProductVisitsTable ProductVisitsTableTB'>
          <div className='ProductVisitsTableTB_div'>{item.emailAddress}</div>
          <div className='ProductVisitsTableTB_div'>{item.IpAddress}</div>
          <div className='ProductVisitsTableTB_div'>{item.Country}</div>
          <div className='ProductVisitsTableTB_div'>{item.dateVisited}</div>
        </div>
      ))}
    </div>
  )
}

export default WebsiteVisit