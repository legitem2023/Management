import React from 'react'
import { Icon } from '@iconify/react'
import TimestampConverter from '../../../components/timestamp/TimestampConverter'
import Link from 'next/link'
import { setGlobalState } from 'state'
import Loading from 'components/LoadingAnimation/Loading'
import { useQuery } from '@apollo/client'
import { GET_CHILD_INVENTORY } from 'graphql/queries'

const Management_inventory = ({setToggle,data}) => {
  const { data:ChildInventory, loading: ChildInventoryLoading} = useQuery(GET_CHILD_INVENTORY);

  if(ChildInventoryLoading) return <Loading/>

  const ShowEdit = (data:any) =>{
    setToggle(1);
    const setForm = {
      Id:data.id,
      Name:data.name,
      Category:data.category,
      ProductType:data.productType,
      Brandname:data.brandname,
      Status:data.status
    }
    setGlobalState("invFormDataEdit",setForm)
  }

    const path = process.env.NEXT_PUBLIC_PATH;
    return data.length > 0 ? data.map((item: any, idx: any) => (
      <div key={idx} className='InventoryBody'>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
            {item.id}
        </div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.name}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.category}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.productType}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.brandname}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.status}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><TimestampConverter timestamp={item.dateCreated} /></div>
        <div className={'InventoryBodyCell InventoryBodyCell_det' + ' InventoryBodyCell' + item.id}>
            <Link href={path + "Management/Inventory/Details/?style=" + item.styleCode}>Details({ChildInventory.getChildInventory.filter((filtered)=>filtered.style_Code===item.styleCode).length})</Link></div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
          <Icon icon="bxs:edit" className='management_edit' onClick={()=>{ShowEdit(item)}}/>
          <Icon icon="material-symbols:delete-sharp" className='management_delete' />
          <Icon icon="carbon:view-filled" className='management_item'/>
        </div>
        <div className='management_divider'></div>
      </div>
    )):<h1>No Data</h1>
  }

export default Management_inventory