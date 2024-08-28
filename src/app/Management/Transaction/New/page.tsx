"use client"
import { useQuery } from '@apollo/client'
import { Icon } from '@iconify/react'
import NewOrder from 'components/Management/Management_orders/NewOrder'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import TransactionLinks from 'components/Management/ManagementTransaction/TransactionLinks'
import { READ_ORDERS } from 'graphql/queries'
import Image from 'next/image'
import React from 'react'
import { formatter } from 'utils/triggers'
const New = () => {
  return (
    <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader/>
          <ManagementDrawer/>
          <ManagementNavigation/>
          <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='grommet-icons:transaction' /> New</div>
              {/* <ManagementSearch/> */}
              <TransactionLinks/>
              <NewOrder/>
          </div>
        </div>
    </div>
  )
}

export default New