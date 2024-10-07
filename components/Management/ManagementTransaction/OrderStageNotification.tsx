import React from 'react'

type PropsOrderStageNotification = {
    notification:any
}
const OrderStageNotification:React.FC<PropsOrderStageNotification> = ({notification}) => {
  return (
    <span className='OrderStageNotification' 
          style={{'display':notification===0?'none':'flex'}}>{notification}
    </span>
  )
}

export default OrderStageNotification