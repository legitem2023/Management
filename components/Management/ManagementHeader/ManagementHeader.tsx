import { Icon } from '@iconify/react';
import React from 'react'
import { setGlobalState, useGlobalState } from 'state'

const ManagementHeader = () => {
const [CurrentDrawer] = useGlobalState("CurrentDrawer");
  const handleDrawer = () =>{
    if(CurrentDrawer===true){
      setGlobalState("CurrentDrawer",false)
    }else{
      setGlobalState("CurrentDrawer",true)
    }
  }
  return (
    <div className='ManagementHeader'>
      <Icon icon="iconamoon:menu-burger-horizontal-fill" className='drawer' onClick={handleDrawer} />
    </div>
  )
}

export default ManagementHeader