"use client"
import { Icon } from '@iconify/react'
import LogisticOrder from 'components/Management/Management_orders/LogisticOrder'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import TransactionLinks from 'components/Management/ManagementTransaction/TransactionLinks'
import React from 'react'

const Logistic = () => {
  return (
    <div className='Main'>
    <div className='ManagementBody'>
      <ManagementHeader/>
      <ManagementDrawer/>
      <ManagementNavigation/>
      <div className='ManagementMainMenu'>
      <div className='Menu_label_management'><Icon icon='grommet-icons:transaction' /> Logistic</div>
          <TransactionLinks/>
          <LogisticOrder/>
      </div>
    </div>
</div>
  )
}

export default Logistic