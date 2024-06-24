import React from 'react'
import transactionData from '../../../json/transactionStages.json'
import Image from 'next/image'
import Link from 'next/link'
const TransactionLinks = () => {  
    
    
    const path = process.env.NEXT_PUBLIC_PATH

  return (
    <div>{
        transactionData.map((item:any,idx:any)=>(
            <Link href={path+item.URL} key={idx}> 
                <Image src={item.Image} height='50' width='50' alt={idx} className='TransactionImage'></Image>
            </Link>
        ))
        }
    </div>
  )
}

export default TransactionLinks