import { Icon } from '@iconify/react'
import TimestampConverter from 'components/timestamp/TimestampConverter'
import Image from 'next/image'
import React from 'react'
import { setGlobalState, useGlobalState } from 'state'
import { imageSource } from 'utils/extraFetch'

const Manament_inventory_detail = ({data,setToggle}) => {
    const limitText = (text: any) => {
        return text.slice(0, 10) + (text.length > 10 ? "..." : "");
      }    
    const SetScale = (item:any) =>{
     const invFormDetailDataEdit = {
        styleCode:item.style_Code===null?'':item.style_Code,
        Color:item.color===null?'':item.color,
        Size:item.size===null?'':item.size,
        Price:item.price===null?'':item.price,
        Status:item.status===null?'':item.status,
        Stock:item.stock===null?'':item.stock,
        Description:item.productDescription===null?'':item.productDescription,
        Id:item.id
    }
    setGlobalState("invFormDetailDataEdit",invFormDetailDataEdit)
        setToggle(1);
    }
  return (
    <div>
        {data.map((item: any, idx: any) => (
              <div key={idx} className='InventoryBody_child'>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
                    <Image src={imageSource(item)} alt={item.id} height='60' width='80' aria-current={item.id} />
                </div>
                <div className='InventoryBodyCell '>{item.productCode}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.name}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.color}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.size}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.price}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.stock}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{item.status}</div>
                <div>
                  <p><TimestampConverter timestamp={item.dateCreated} /></p>
                  <p><TimestampConverter timestamp={item.dateUpdated} /></p>
                </div>
                <div>
                  <p>{limitText(item.creator)}</p>
                  <p>{limitText(item.editor)}</p>
                </div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
                    <label>
                        <input type="checkbox" id={"edit" + item.id} className='hidden' aria-current={item.id} aria-label={idx + 1}></input>
                        <Icon icon="bxs:edit" className='management_edit' onClick={()=>SetScale(item)}/>
                    </label>
                  <Icon icon="material-symbols:delete-sharp" className='management_delete' />
                  <Icon icon="carbon:view-filled" />
                </div>
              </div>
            ))}
    </div>
  )
}

export default Manament_inventory_detail