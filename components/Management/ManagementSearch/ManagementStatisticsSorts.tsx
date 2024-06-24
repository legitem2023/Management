import React, { useEffect, useState } from 'react'
// import DataManager from 'utils/DataManager';
// import { cookies } from '../Management_cookies/Management_cookies';
// import { MANAGEMENT_INVENTORY,GET_CHILD_INVENTORY_DETAIL } from 'graphql/queries';
import { setGlobalState, useGlobalState } from 'state';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation'
const ManagementStatisticsSorts = () => {

    const [currentFromDate] = useGlobalState("fromDate");
    const [currenttoDate] = useGlobalState("toDate");
    const [currentItemPerpage] = useGlobalState("ItemPerpage");
    const [currentAgentPerpage] = useGlobalState("AgentPerpage");

    const fromDate = (e: any) => {
        setGlobalState("fromDate", e.target.value);
        setGlobalState("setInitSlice", 1);
    }
    const toDate = (e: any) => {
        setGlobalState("toDate", e.target.value);
        setGlobalState("setInitSlice", 1);
    }

    const ItemPerpage = (e: any) => {
        setGlobalState("ItemPerpage", e.target.value);
        setGlobalState("setInitSlice", 1);
    }

    return (
        <div className='statistics_Search_container'>
            <div>
                <div>
                    From Date<input type='datetime-local' defaultValue={currentFromDate} onChange={fromDate} />
                </div>
                <div>
                    To Date<input type='datetime-local' defaultValue={currenttoDate} onChange={toDate} />
                </div>
            </div>
            <div>
                <div>
                    Items Per Page <select onChange={ItemPerpage}>
                        <option>10</option>
                        <option>30</option>
                        <option>50</option>
                        <option>75</option>
                        <option>100</option>
                        <option>All</option>
                    </select>
                </div>
                <div>
                    {/* To Date<input type='datetime-local' defaultValue={currenttoDate} onChange={toDate} /> */}
                </div>
            </div>
        </div>
    )
}

export default ManagementStatisticsSorts