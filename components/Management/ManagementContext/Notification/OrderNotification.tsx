import React from 'react'
import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification'
const OrderNotification = () => {
    const { updateNewOrder,updateRecieved,updatePacked,updateLogistic,updateDelivery,updateDelivered }:any = useOrderStatusNotification();
    const total = parseInt(updateNewOrder) + parseInt(updateRecieved) + parseInt(updatePacked) + parseInt(updateLogistic) + parseInt(updateDelivery) + parseInt(updateDelivered);
    return (
    <div style={{display:total===0?"none":"flex",width:"25px",height:"25px",borderRadius:"50%",backgroundColor:"red",color:"white",justifyContent:"center",alignItems:"center",fontSize:"10px",position:"absolute",right:"10px"}}>{total}</div>
  )
}

export default OrderNotification