"use client"
import React, { useEffect } from 'react'
import ManagementHeader from '../ManagementHeader/ManagementHeader'
import Navigation from '../../../json/ManagementNav.json'
import { Icon } from '@iconify/react'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
const ManagementBody = () => {
  const router = usePathname();
  const currentLocation = router.match(/([^\/]*)\/*$/)[1];
  const [useColor,setColor] = React.useState("");

  useEffect(() => {
    // Update color when the component mounts or when currentLocation changes
    setColor(currentLocation);
  }, [currentLocation]);

  return (
    <div className='ManagementBody'>
        <ManagementHeader/>
        <div className='ManagementDrawer'>
        <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
        </div>
        <div className='ManagementNavigation'>
            <ul className='managementNavigationmenu'>
              <li className='Menu_label_management'>Menu</li>
                {Navigation.map((item:any,idx:any) =>(
                    <li key={idx} style={{ backgroundColor: item.URL === useColor ? 'rgb(228 187 255)' : 'rgb(214 153 255)' }}><Link href={"/Management/"+item.URL}><Icon icon={item.Icon}/>{item.Name}</Link></li>
                ))}
            </ul>
        </div>
        <div className='ManagementMainMenu'></div>
    </div>
  )
}

export default ManagementBody