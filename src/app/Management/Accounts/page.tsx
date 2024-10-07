"use client"
import React, { useState } from 'react'
import DataManager from 'utils/DataManager'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import { Icon } from '@iconify/react'
import Management_account from 'components/Management/Management_account/Management_account'
import { useMutation, useQuery } from '@apollo/client'
import { INSERT_NEW_ENCODER } from 'graphql/Mutation'
import { useGlobalState } from 'state'
import { GET_FILTERED_USERS } from 'graphql/queries'
import Loading from 'components/LoadingAnimation/Loading'
import InsertForm from './InsertForm'
import EditForm from './EditForm'
import { ToastContainer } from 'react-toastify'
const Accounts = () => {
  const Manager = new DataManager();
  const [useEmail] = useGlobalState("cookieEmailAddress");
  const [useLevel] = useGlobalState("cookieUserLevel");

  const { data:Account, loading:AccountLoading } = useQuery(GET_FILTERED_USERS,{
    variables: { emailAddress: useEmail, userLevel: useLevel }
  });
  
console.log(useEmail,useLevel)
const [useToggle,setToggle] = useState(0);
const [useToggle_edit,setToggle_edit] = useState(0);

const ShowForm = () =>{
  setToggle(1);
}

const ShowEditForm = () =>{
  setToggle_edit(1)
}

if(AccountLoading) return <Loading/>;
  return (
    <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader/>
          <ManagementDrawer/>
          <ManagementNavigation/>
          <div className='ManagementMainMenu'>
          <ToastContainer />
          <div className='Menu_label_management'><Icon icon='mdi:accounts' /> Accounts</div>
              {/* <ManagementSearch/> */}
              <button className='addNewItemButton' onClick={ShowForm}>
                <Icon icon="ic:round-add-box" className="addNewAccount"/>
              </button>
              <div className='AccountTable'>
                <div className='AccountTable_head'>
                  <div></div>
                  <div>Email Address</div>
                  <div>Store Name</div>
                  <div>Account Level</div>
                  <div>Date Created</div>
                  <div>Date Updated</div>
                  <div>Mac Address</div>
                  <div>Action</div>
                </div>
                  {<Management_account accountList={Account.getFilteredUser} EditForm={ShowEditForm}/>}
              </div>
              <div className='Universal_cover' style={{'transform':`scale(${useToggle})`}}>
                <Icon icon="eva:close-square-fill"  
                      onClick={() => setToggle(0)}
                      style={{color: '#ff0000',fontSize:'40px',cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} />
              <InsertForm/>
              </div>
              <div className='Universal_cover' style={{'transform':`scale(${useToggle_edit})`}}>
                <Icon icon="eva:close-square-fill"  
                      onClick={() => setToggle_edit(0)}
                      style={{color: '#ff0000',fontSize:'40px',cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} />
              <EditForm/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Accounts