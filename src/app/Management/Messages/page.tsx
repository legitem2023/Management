"use client"
import { Icon } from '@iconify/react'
import CrowdMessages from 'components/Crowd/CrowdMessages'
import Messages from 'components/Crowd/Messages'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import React from 'react'

const page = () => {
    return (
        <div className='Main'>
            <div className='ManagementBody'>
                <ManagementHeader />
                <ManagementDrawer />
                <ManagementNavigation />
                <div className='ManagementMainMenu'>
                    <div className='Menu_label_management'><Icon icon='typcn:messages' /> Messages</div>
                    <Messages />
                    <div className='InventoryTable'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page