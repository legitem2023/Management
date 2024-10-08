
"use client"
import { Icon } from '@iconify/react'
import DeliveredOrder from 'components/Management/Management_orders/DeliveredOrder'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import TransactionLinks from 'components/Management/ManagementTransaction/TransactionLinks'
import React from 'react'

const Delivered = () => {
  return (
    <div className='Main'>
    <div className='ManagementBody'>
      <ManagementHeader/>
      <ManagementDrawer/>
      <ManagementNavigation/>
      <div className='ManagementMainMenu'>
      <div className='Menu_label_management'><Icon icon='grommet-icons:transaction' /> Transaction</div>
          <TransactionLinks/>
          <DeliveredOrder/>
      </div>
    </div>
</div>
  )
}

export default Delivered