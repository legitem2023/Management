import React from 'react'
import transactionData from '../../../json/transactionStages.json'
import Image from 'next/image'
import Link from 'next/link'
import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification'
import { setGlobalState } from 'state'
import { useRouter } from 'next/navigation'
import OrderStageNotification from './OrderStageNotification'
const TransactionLinks = () => {  
  const router = useRouter();
  const { updateNewOrder,updateRecieved,updatePacked,updateLogistic,updateDelivery,updateDelivered } = useOrderStatusNotification();
    const path = process.env.NEXT_PUBLIC_PATH
  return (
    <div className='OrderStages'>{
      transactionData.map((item:any,idx:any)=>(
          <Link key={idx} href={path+item.URL}>                    
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