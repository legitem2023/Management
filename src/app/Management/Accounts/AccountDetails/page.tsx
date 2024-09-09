"use client"
import React, { useEffect, useState } from 'react'
import DataManager from 'utils/DataManager'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import { Icon } from '@iconify/react'
import { decode } from 'js-base64'
const Accounts = () => {
  const [useAccountDetails,setAccountDetails] = useState([]);
    const Manager = new DataManager();
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const dataParam = JSON.parse(decode(params.get('data') || '[]'));
        setAccountDetails(dataParam);
    },[])
  return (
    <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader/>
          <ManagementDrawer/>
          <ManagementNavigation/>
          <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='mdi:accounts' /> Accounts</div>
            <div>
              <div className='ManagementAccountDetailsHead'>
                <div>ID</div>
                <div>Email Address</div>
                <div>Contact No.</div>
                <div>Fullname</div>
                <div>StoreName</div>
              </div>
              {useAccountDetails.map((item:any,idx:number)=>(
              <div key={idx} className='ManagementAccountDetails'>
                <div>{item.id}</div>
                <div>{item.accountEmail}</div>
                <div>{item.contactNo}</div>
                <div>{item.fullname}</div>
                <div>{item.storeName}</div>
              </div>
            ))}</div>
          </div>
        </div>
    </div>
  )
}

export default Accounts