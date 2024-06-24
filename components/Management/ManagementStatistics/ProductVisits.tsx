'use client'
import React, { useState } from 'react'
import DataManager from 'utils/DataManager'
import StatisticsTab from './Tabs';
import { setGlobalState, useGlobalState } from 'state';
import StatisticsPagination from './StatisticsPagination';
const ProductVisits = () => {
  const Manager = new DataManager();
  const {NumberOFViews,LoadingNumberOFViews,ErrorNumberOFViews} = Manager.NumberOfViews();
  const [currentFromDate] = useGlobalState("fromDate");
  const [currenttoDate] = useGlobalState("toDate");
  const [currentItemPerpage] = useGlobalState("ItemPerpage");
  const [currentAgentPerpage] = useGlobalState("AgentPerpage");
  const [useInitSlice] = useGlobalState("setInitSlice");
  const [pagination_currentPageCount, pagination_setCurrentPageCount] = useState(30);


  if(LoadingNumberOFViews) return 


  const sku_array = [
    // fetchSKUbyClient.fetchEffect.filter((email: any) => { return email.accountid === currentAgentPerpage && email.sku !== null }).map((item: any) => {
    //   return item.sku
    // })
  ]

  const skuParamer = sku_array[0]
  const inputDatefrom = new Date(currentFromDate);
  const timestampfromdate = inputDatefrom.getTime();


  const inputDateto = new Date(currenttoDate);
  const timestamptodate = inputDateto.getTime();


  const VisitsData = (item:any,idx:any)=>(
    
      <div key={idx} className='ProductVisitsTable ProductVisitsTableTB'>
        <div className='ProductVisitsTableTB_div'>{item.productCode}</div>
        <div className='ProductVisitsTableTB_div'>{item.emailAddress}</div>
        <div className='ProductVisitsTableTB_div'>{item.IpAddress}</div>
        <div className='ProductVisitsTableTB_div'>{item.Country}</div>
        <div className='ProductVisitsTableTB_div'>{item.dateVisited}</div>
      </div>
    )


    const convertedCurrentPage = (currentItemPerpage !== "All" ? parseInt(currentItemPerpage) : currentItemPerpage);
    let itemsPerPage:any = convertedCurrentPage;
    let currentPage = useInitSlice; // Display the second page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const totalItems = pagination_currentPageCount//fetchViews.fetchViews.length;
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
      {
        currentAgentPerpage === "Select Email Address" ?/**** IF EMAIL IS NOT SELECTED ****/
          currentFromDate === null && currenttoDate === null ?
            NumberOFViews.getNumberOfViews.length !== 0 ?
              NumberOFViews.getNumberOfViews.slice().sort((a: any, b: any) => b.id - a.id).slice(startIndex, currentItemPerpage === "All" ? NumberOFViews.getNumberOfViews.length : endIndex).map((item: any, index: any) => (
              VisitsData(item, index)
            )) : <h1>No Data!</h1> : NumberOFViews.getNumberOfViews.length !== 0 ?"": <h1>No Data!</h1>
             :/**** IF EMAIL IS SELECTED ****/ currentFromDate === null && currenttoDate === null ?
              NumberOFViews.getNumberOfViews.length !== 0 ?
            NumberOFViews.getNumberOfViews.slice().sort((a: any, b: any) => b.id - a.id).filter((item: any) => skuParamer.includes(item.sku)).slice(startIndex, currentItemPerpage === "All" ? NumberOFViews.getNumberOfViews.length : endIndex).map((item: any, index: any) => (
              VisitsData(item, index)
            )) : <h1>No Data!</h1> : NumberOFViews.getNumberOfViews.length !== 0 ?NumberOFViews.getNumberOfViews.slice(startIndex, currentItemPerpage === "All" ? NumberOFViews.getNumberOfViews.length : endIndex).map((item: any, index: any) => (
              VisitsData(item, index))) : <h1>No Data!</h1>
      }
    </div>
  )
}

export default ProductVisits