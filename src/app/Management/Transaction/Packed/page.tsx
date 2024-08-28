"use client"
import { Icon } from '@iconify/react'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import TransactionLinks from 'components/Management/ManagementTransaction/TransactionLinks'
import React from 'react'
import PackedOrder from 'components/Management/Management_orders/PackedOrder'
const Packed = () => {
  return (
    <div className='Main'>
    <div className='ManagementBody'>
      <ManagementHeader/>
      <ManagementDrawer/>
      <ManagementNavigation/>
      <div className='ManagementMainMenu'>
      <div className='Menu_label_management'><Icon icon='grommet-icons:transaction' /> Packaging</div>
          <TransactionLinks/>
          <PackedOrder/>
      </div>
    </div>
</div>
  )
}

export default Packed