import { Icon } from '@iconify/react'
import TimestampConverter from 'components/timestamp/TimestampConverter'
import Image from 'next/image'
import React, { useState } from 'react'
import { setGlobalState, useGlobalState } from 'state'
import { imageSource } from 'utils/extraFetch'
import { fallbackImage,handleError } from 'utils/triggers'
import { UPLOAD_GLB_MODEL } from 'graphql/Mutation'
import { useMutation } from '@apollo/client'
import DataManager from 'utils/DataManager'

const Manament_inventory_detail = ({data,setToggle,ShowUpload,HandleDelete}) => {
    const Manager = new DataManager();
    const [useLoading,setLoading] = useState(false);

    const [upload_glb_model] = useMutation(UPLOAD_GLB_MODEL,{
        onCompleted: (data) => {
            console.log(data)
            if(data.upload3DModel.statusText==='Success'){
              Manager.Success(data.upload3DModel.statusText);
                setLoading(false);
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const limitText = (text: any) => {
        return text.slice(0, 10) + (text.length > 10 ? "..." : "");
      }
    const SetScale = (item:any) =>{
     const invFormDetailDataEdit = {
        productCode:item.product_Code===null?'':item.product_Code,
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



    const handleModelUpload = (e:any) =>{
        setLoading(true);
        const file = e.target.files[0];
        const id = e.target.getAttribute("aria-label");
        if (file) {
          const reader:any = new FileReader();
          reader.onloadend = () => {
            upload_glb_model({
              variables:{
                  "model": reader.result,
                  "upload3DModelId": id
              }
          })
          };
          reader.readAsDataURL(file);
        }
    }
  return (
    <div>
        {data?.map((item: any, idx: any) => (
              <div key={idx} className='InventoryBody_child'>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
                    <Image src={imageSource(item)} 
                           onError={(e:any)=>handleError(e)} 
                           alt={item.id} 
                           height='60' 
                           width='80' 
                           aria-current={item.id} 
                           onClick={()=>ShowUpload(item.id)}/>
                </div>
                <div className='InventoryBodyCell '><span className='hideInDesktop'>Product Code : </span>{item.productCode}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Name : </span>{item.name}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Color : </span>{item.color}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Size : </span>{item.size}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Price : </span>{item.price}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Stock : </span>{item.stock}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Status : </span>{item.status}</div>
                <div>
                <p className='InventoryBodyCell'><span className='hideInDesktop'>Created At: </span><TimestampConverter timestamp={item.dateCreated} /></p>
                <p className='InventoryBodyCell'><span className='hideInDesktop'>Deleted At: </span><TimestampConverter timestamp={item.dateUpdated} /></p>
                </div>
                <div>
                  <p className='InventoryBodyCell'><span className='hideInDesktop'>Creator: </span>{limitText(item.creator)}</p>
                  <p className='InventoryBodyCell'><span className='hideInDesktop'>Editor: </span>{limitText(item.editor)}</p>
                </div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id + " ActionsGrid"}>
                <span className='hideInDesktop'>Action </span>  
                    <label>
                        <input type="checkbox" id={"edit" + item.id} className='hidden' aria-current={item.id} aria-label={idx + 1}></input>
                        <Icon icon="bxs:edit" className='management_edit' onClick={()=>SetScale(item)}/>
                    </label>
                    <label>
                      <Icon icon="material-symbols:delete-sharp" className='management_delete' onClick={()=>HandleDelete(item.id)}/>
                    </label>
                    <label>
                      <Icon icon="carbon:view-filled" />
                    </label>
                  <label htmlFor={"GLB" + item.id}>
                    {useLoading?<Icon icon="eos-icons:loading" />:<Icon icon="game-icons:cube" />}
                  </label>
                  <input type='file' id={"GLB" + item.id} aria-label={item.id} className='hidden' onChange={(e)=>handleModelUpload(e)}/>
                </div>
              </div>
            ))}
    </div>
  )
}

export default Manament_inventory_detail