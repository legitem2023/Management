import React from 'react'
import transactionData from '../../../json/transactionStages.json'
import Image from 'next/image'
import Link from 'next/link'
import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification'
import { setGlobalState } from 'state'
import { useRouter } from 'next/navigation'
import OrderStageNotification from './OrderStageNotification'
import { ClearStorage } from 'utils/extraFetch'
const TransactionLinks = () => {  
  const router = useRouter();
  const { updateNewOrder,
          updateRecieved,
          updatePacked,
          updateLogistic,
          updateDelivery,
          updateDelivered,
          setUpdateNewOrder,
          setUpdateRecieved,
          setUpdatePacked,
          setUpdateLogistic,
          setUpdateDelivery,
          setUpdateDelivered,
        } = useOrderStatusNotification();
    const path = process.env.NEXT_PUBLIC_PATH






    const ClearLocalStorage = (item:any) =>{
      // setGlobalState("CurrentOrderStage",item.URL);
      item.Name==='New Order'?ClearStorage(setUpdateNewOrder,"NewOrder"):"";
      item.Name==='Recieve'?ClearStorage(setUpdateRecieved,"Recieved"):"";
      item.Name==='Packed'?ClearStorage(setUpdatePacked,"Packed"):"";
      item.Name==='Logistic'?ClearStorage(setUpdateLogistic,"Logistic"):"";
      item.Name==='Delivery'?ClearStorage(setUpdateDelivery,"Delivery"):"";
      item.Name==='Delivered'?ClearStorage(setUpdateDelivered,"Delivered"):"";
    }
  
  


  return (
    <div className='OrderStages'>{
      transactionData.map((item:any,idx:any)=>(
          <Link key={idx} href={path+item.URL} onClick={()=>ClearLocalStorage(item)}>                    
              {item.Name === 'New Order'?<OrderStageNotification notification={updateNewOrder} />:null}
              {item.Name === 'Recieve'?<OrderStageNotification notification={updateRecieved} />:null}
              {item.Name === 'Packed'?<OrderStageNotification notification={updatePacked} />:null}
              {item.Name === 'Logistic'?<OrderStageNotification notification={updateLogistic} />:null}
              {item.Name === 'Delivery'?<OrderStageNotification notification={updateDelivery} />:null}
              {item.Name === 'Delivered'?<OrderStageNotification notification={updateDelivered}/>:null}
              <Image src={item.Image} height='50' width='50' alt={idx} className='TransactionImage'></Image>
          </Link>
      ))
      }
  </div>
  )
}

export default TransactionLinks