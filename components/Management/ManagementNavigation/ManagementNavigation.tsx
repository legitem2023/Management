"use client"
import React, { useEffect } from 'react'
import Navigation from '../../../json/ManagementNav.json'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const ManagementNavigation = () => {
  const router = usePathname();
  const routes = useRouter();
  const currentLocation = router.match(/([^\/]*)\/*$/)[1];
  const [useColor, setColor] = React.useState("");
  useEffect(() => {
    setColor(currentLocation === 'Details' ? "Inventory" :
      currentLocation === "webvisit" || currentLocation === "views" ? "Statistics" :
        currentLocation === 'New' ||
          currentLocation === 'Recieve' ||
          currentLocation === 'Packed' ||
          currentLocation === 'Logistic' ||
          currentLocation === 'Delivery' ||
          currentLocation === 'Delivered' ? "Transaction" : currentLocation);
  }, [currentLocation, routes]);

  return (
    <div className='ManagementNavigation'>
      <ul className='managementNavigationmenu'>
        <li className='Menu_label_management'>Menu</li>
        {Navigation.map((item: any, index: any) => (
          <li key={index} style={{ backgroundColor: item.URL === useColor ? 'rgb(228 187 255)' : 'rgb(214 153 255)' }}><Link href={"/Management/" + item.URL}><Icon icon={item.Icon} /><span className='hideInmobile'>{item.Name}</span></Link></li>
        ))}
      </ul>
    </div>
  )
}

export default ManagementNavigation