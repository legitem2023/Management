"use client"
import React, { useEffect } from 'react'
import Navigation from '../../../json/ManagementNav.json'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setGlobalState, useGlobalState } from 'state'
import { cookies } from '../Management_cookies/Management_cookies'
import OrderNotification from 'components/Management/ManagementContext/Notification/OrderNotification'

const ManagementNavigation = () => {
  
  const router = usePathname();
  const routes = useRouter();
  const [CurrentDrawer] = useGlobalState("CurrentDrawer");
  const currentLocation = router.match(/([^\/]*)\/*$/)[1];


  const [useColor, setColor] = React.useState("");
  useEffect(() => {
    cookies();
    setColor(currentLocation === 'Details' ? "Inventory" :
      currentLocation === "webvisit" || currentLocation === "views" ? "Statistics" :
        currentLocation === 'New' ||
          currentLocation === 'Recieve' ||
          currentLocation === 'Packed' ||
          currentLocation === 'Logistic' ||
          currentLocation === 'Delivery' ||
          currentLocation === 'Delivered' ? "Transaction" : currentLocation);
  }, [currentLocation, routes]);
  const handleDrawer = () =>{
    if(CurrentDrawer===true){
      setGlobalState("CurrentDrawer",false)
    }else{
      setGlobalState("CurrentDrawer",true)
    }
  }
  return (
    <div className='ManagementNavigation' style={{"left":CurrentDrawer===true?"-100vw":"0vw"}}>
      <ul className='managementNavigationmenu'>
        <li className='Menu_label_management'>Menu</li>
        {Navigation.map((item: any, index: any) => (
          <li key={index} onClick={handleDrawer} style={{position:'relative', backgroundColor: item.URL === useColor ? 'rgb(228 187 255)' : 'rgb(214 153 255)' }}><Link href={"/Management/" + item.URL}><Icon icon={item.Icon} /><span>{item.Name}</span>{item.Name==='Transaction'?<OrderNotification/>:''}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default ManagementNavigation