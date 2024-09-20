"use client"
import { Icon } from '@iconify/react'

import Messages from 'components/PersonalMessages/Messages' 
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import React from 'react'
import CKEditorComponent from 'components/Management/Management_ui/CKEditorComponent'
import News from 'components/Management/Management_news/News'
import { ToastContainer } from 'react-toastify'

const page = () => {


    return (
        <div className='Main'>
            <div className='ManagementBody'>
                <ManagementHeader />
                <ManagementDrawer />
                <ManagementNavigation />
                <div className='ManagementMainMenu'>
                    <div className='Menu_label_management'><Icon icon="fa6-solid:newspaper" /> News</div>
                    <News/>
                    <ToastContainer></ToastContainer>
                </div>
                </div>
        </div>
    )
}

export default page