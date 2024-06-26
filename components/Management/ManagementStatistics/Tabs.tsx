'use client'
import React,{useEffect} from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
export default function StatisticsTab() {
    const path = process.env.NEXT_PUBLIC_STATISTICS_LINK;
  const StatisticsTabs = [
    {
      "Name":"Chart",
      "Checked":true,
      "href":"/",
      "icon":"mdi:graph-bar"
    },    {
      "Name":"Website Visits",
      "Checked":false,
      "href":"/webvisit/",
      "icon":"material-symbols:nest-doorbell-visitor-outline"
    },    {
      "Name":"Product Views",
      "Checked":false,
      "href":"/views/",
      "icon":"ep:view"
    }
  ]


  return (
        <div className="TabsParent">
          {StatisticsTabs.map((item:any,idx:any)=>(
            <div key={idx}>
            <Link href={path+item.href}  className="Tabs"><Icon icon={item.icon}></Icon> {item.Name}</Link>
            </div>
          ))}
        </div>
  );
}
