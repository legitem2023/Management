"use client"
import React, { useState } from 'react'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import { Icon } from '@iconify/react'

import Tabs from 'components/Management/Management_ui/Tabs'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Settings = () => {
  return (
    <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader/>
          <ManagementDrawer/>
          <ManagementNavigation/>
          <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='material-symbols:settings-outline' /> Settings</div>
              <Tabs/>
          </div>
          <ToastContainer></ToastContainer>
        </div>
    </div>
  )
}

export default Settings