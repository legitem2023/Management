"use client"
import React, { useEffect } from 'react'
import DataManager from 'utils/DataManager'
import ManagementBody from 'components/Management/ManagementBody/ManagementBody'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import TimestampConverter from 'components/timestamp/TimestampConverter'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { setGlobalState, useGlobalState } from 'state'
import Link from 'next/link'
import { cookies } from 'components/cookies/cookie'

// import { useGlobalState } from 'components/context/ShoppingCartProvider'

const Accounts = () => {
  const Manager = new DataManager();
  const path = process.env.NEXT_PUBLIC_PATH
  const [activate,setActivation] = React.useState(false)
  const [useID,setID] = React.useState(0)
  
  const {Account,loading,error} = Manager.ManagementAccount();
  if(loading) return;
  if(error) return;
  if(!Account) return;
  const limitText = (text:any) =>{
    return  text.slice(0, 10) + (text.length > 10 ? "..." : "");
  }
  const activateEdit = (e:any) =>{
    let checkbox:any = e.target.getAttribute("aria-current");
    setID(checkbox)
    setActivation(e.target.checked)
    if(e.target.checked){
      setGlobalState("editingMode",true)
    }else{
      setGlobalState("editingMode",false)
    }
  }

  const AccountLevel = (defaultval:any,index:any) =>{
    return (<select defaultValue={defaultval} id={"Ptype"+index}>
              <option value='Select Product Type'>Merchant</option>
              <option value='Select Product Type'>Encoder</option>
            </select>)
    }

  const AccountProduct = () =>{
      return Account?.getUser.map((item:any,idx:any)=>(
        <div key={idx} className='AccountTable_body'>
          <div className='AccountTableCell'>
          <label>
              <input type="checkbox" id={"edit"+idx} className='hidden' aria-current={idx} onChange={activateEdit}></input>
              <Icon icon="bxs:edit" className='management_edit'/>
          </label> 
          </div>
          <div className='AccountTableCell'>{activate===true?"AccEmail"+useID==="AccEmail"+idx?<input type='text' defaultValue={item.email} placeholder="Input Email..." id={'AccEmail'+idx}></input>:item.email===null||item.email===""?"Input Email...":item.email:item.email===null||item.email===""?"Input Name...":limitText(item.email)}</div>
          <div className='AccountTableCell'>{activate===true?"AccStore"+useID==="AccStore"+idx?<input type='text' defaultValue={item.nameOfStore} placeholder="Name of Store..." id={'AccStore'+idx}></input>:item.nameOfStore===null||item.nameOfStore===""?"Name of Store...":item.nameOfStore:item.nameOfStore===null||item.nameOfStore===""?"Name of Store...":limitText(item.nameOfStore)}</div>
          <div className='AccountTableCell'>{activate===true?"AccLevel"+useID==="AccLevel"+idx?AccountLevel(item.accountLevel,idx):item.accountLevel===null||item.accountLevel===""?"Select Level...":item.accountLevel:item.accountLevel===null||item.accountLevel===""?"Select Level...":limitText(item.accountLevel)}</div>
          <div className='AccountTableCell'><TimestampConverter timestamp={item.dateCreated}/></div>
          <div className='AccountTableCell'><TimestampConverter timestamp={item.dateUpdated}/></div>
          <div className='AccountTableCell'>{activate===true?"AccMacAdd"+useID==="AccMacAdd"+idx?<input type='text' defaultValue={item.macAddress} placeholder="Mac Address..." id={'AccMacAdd'+idx}></input>:item.macAddress===null||item.macAddress===""?"Mac Address...":item.macAddress:item.macAddress===null||item.macAddress===""?"Mac Address...":limitText(item.macAddress)}</div>
          <div className='AccountTableCell AccountTableCell_det'>
            <Link className='details_link' href={path+"Management/Inventory/Details/?style="+item.id}>Details()</Link>
          </div>
          <div className='AccountTableCell'>
          <Icon icon="material-symbols:delete-sharp" className='management_delete'/>
          <Icon icon="carbon:view-filled" />
          </div>
        </div>
      ))
  }

  return (
    <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader/>
          <ManagementDrawer/>
          <ManagementNavigation/>
          <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='mdi:accounts' /> Accounts</div>
              <ManagementSearch/>
              <div className='AccountTable'>
                <div className='AccountTable_head'>
                  <div></div>
                  <div>Email Address</div>
                  <div>Store Name</div>
                  <div>Account Level</div>
                  <div>Date Created</div>
                  <div>Date Updated</div>
                  <div>Mac Address</div>
                  <div>Details</div>
                  <div>Action</div>
                </div>
                  {AccountProduct()}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Accounts