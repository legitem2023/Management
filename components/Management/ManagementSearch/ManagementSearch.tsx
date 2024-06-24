import React, { useEffect, useState } from 'react'
import DataManager from 'utils/DataManager';
import { getCookie } from '../Management_cookies/Management_cookies';
import { MANAGEMENT_INVENTORY, GET_CHILD_INVENTORY_DETAIL } from 'graphql/queries';
import { useGlobalState } from 'state';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation'
const ManagementSearch = () => {
  const Manager = new DataManager();
  const [editingMode] = useGlobalState("editingMode");
  const [rowNumber] = useGlobalState("rowNumber");
  // const [useEmail] = useGlobalState("useEmail");
  const [useEmail] = useGlobalState("cookieEmailAddress");
  const [useLevel] = useGlobalState("cookieUserLevel");
  const [useSyle, setStyle] = useState("");
  const routes = usePathname();
  const currentLocation = routes.match(/([^\/]*)\/*$/)[1];
  useEffect(() => {
    const windata = typeof window !== undefined ? window.location.search : "";
    const urlParams = new URLSearchParams(windata);
    const style: any = urlParams.get('style');
    setStyle(style)
  }, [])

  const insertInventory = Manager.ManagementInsertInventory();
  const insert_emailAdd = () => {
    const JSON = {
      emailAddress: useEmail
    }
    insertInventory({
      variables: JSON,
      refetchQueries: [{
        query: MANAGEMENT_INVENTORY, variables: { emailAddress: useEmail }
      }]
    })
  }

  const insertChildInventory = Manager.ManagementInsertChildInventory();
  const insert_emailAdd_and_styleCode = () => {

    const JSON = {
      emailAddress: useEmail,
      styleCode: useSyle
    }
    insertChildInventory({
      variables: JSON,
      refetchQueries: [{
        query: GET_CHILD_INVENTORY_DETAIL,
        variables: {
          styleCode: useSyle
        }
      }, {
        query: MANAGEMENT_INVENTORY
      }]
    })
  }

  const CSSstyle: any = {
    top: editingMode === true ? "0px" : "-100px"
  }

  return (
    <div className='Search_container'>
      <div className='Search_container_grid'>
        <div className='SearchColumn'>
          <input type='text' placeholder='Search'></input>
        </div>
        <div className='SortColumn'>
          <select>
            <option>Select By Brand</option>
          </select>
        </div>
        <div className='SortColumn'>
          <select>
            <option>Select By Category</option>
          </select>
        </div>
        <button className='addNewItemButton'>
          <Icon icon="ic:round-add-box" className="addNewItem" onClick={currentLocation === 'Inventory' ? insert_emailAdd : insert_emailAdd_and_styleCode} />
        </button>
      </div>
      <div className='caution' style={CSSstyle}><Icon icon="icon-park-solid:caution" /> Editing is activated in row no.{rowNumber}</div>
    </div>
  )
}

export default ManagementSearch