import React from 'react'
import transactionData from '../../../json/transactionStages.json'
import Image from 'next/image'
import Link from 'next/link'
import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification'
import { setGlobalState } from 'state'
import { useRouter } from 'next/navigation'
const TransactionLinks = () => {  
  const router = useRouter();
  const { updateNewOrder,updateRecieved,updatePacked,updateLogistic,updateDelivery,updateDelivered } = useOrderStatusNotification();
    const path = process.env.NEXT_PUBLIC_PATH
  return (
    <div className='OrderStages'>{
      transactionData.map((item:any,idx:any)=>(
          <span key={idx} onClick={()=>{
            item.Name==='New Order'?localStorage.removeItem('NewOrder'):"";
            item.Name==='Recieve'?localStorage.removeItem('Recieved'):"";
            item.Name==='Packed'?localStorage.removeItem('Packed'):"";
            item.Name==='Logistic'?localStorage.removeItem('Logistic'):"";
            item.Name==='Delivery'?localStorage.removeItem('Delivery'):"";
            item.Name==='Delivered'?localStorage.removeItem('Delivered'):"";
            router.push(path+item.URL)
            }}>                    
              {item.Name === 'New Order'?<span className='OrderStageNotification' style={{'display':updateNewOrder===0?'none':'flex'}}>{updateNewOrder}</span>:null}
              {item.Name === 'Recieve'?<span className='OrderStageNotification' style={{'display':updateRecieved===0?'none':'flex'}}>{updateRecieved}</span>:null}
              {item.Name === 'Packed'?<span className='OrderStageNotification' style={{'display':updatePacked===0?'none':'flex'}}>{updatePacked}</span>:null}
              {item.Name === 'Logistic'?<span className='OrderStageNotification' style={{'display':updateLogistic===0?'none':'flex'}}>{updateLogistic}</span>:null}
              {item.Name === 'Delivery'?<span className='OrderStageNotification' style={{'display':updateDelivery===0?'none':'flex'}}>{updateDelivery}</span>:null}
              {item.Name === 'Delivered'?<span className='OrderStageNotification' style={{'display':updateDelivered===0?'none':'flex'}}>{updateDelivered}</span>:null}
              <Image src={item.Image} height='50' width='50' alt={idx} className='TransactionImage'></Image>
          </span>
      ))
      }
  </div>
  )
}

export default TransactionLinks