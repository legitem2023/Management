'use client'
import { useMutation, useQuery } from "@apollo/client";
import { READ_ORDERS_RECIEVED } from "graphql/queries";
import { formatter } from "utils/triggers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalState } from "state";
import { cookies } from "../Management_cookies/Management_cookies";
import { UPDATE_ORDER_STATUS_PACKED } from "graphql/Mutation";
import DataManager from "utils/DataManager";
import Loading from "components/LoadingAnimation/Loading";
import { Icon } from "@iconify/react";
export default function Recieved() {    
  const [activeIndex, setActiveIndex] = useState(null);
  const [useEmail] = useGlobalState("cookieEmailAddress");
  const [isloading,setloading] = useState(false)
  const Manager = new DataManager();

  const toggleAccordion = (index:any) => {
      if (activeIndex === index) {
          setActiveIndex(null); // Collapse if clicked again
      } else {
          setActiveIndex(index); // Expand clicked item
      }
  };
  let data:number = 0;
  const { data: orders, loading: ordersLoading, error: orderError,refetch } = useQuery(READ_ORDERS_RECIEVED, {
    variables: { emailAddress: useEmail },
  });  
  
  const [update_order_to_packed] = useMutation(UPDATE_ORDER_STATUS_PACKED, {
    onCompleted:data => 
      { 
        Manager.Success("Your order for packaging")
        refetch();
        setloading(false);
      }
  })
  




  const handlePacked =(event:any) =>{
    setloading(true);
    const OrderNo = event.target.getAttribute("aria-current");
    update_order_to_packed({variables:{
      "orderstatusParameter": {
        "agentEmail": useEmail,
        "OrderNo": OrderNo
      }
    }})
    localStorage.removeItem('Recieved');
  }
  const path = process.env.NEXT_PUBLIC_PATH
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
  if(ordersLoading) return <Loading/>
  if(orderError) return
  const handleImage = (event:any) =>{
    event.target.srcset = path + "image/Legitem-svg.svg"
    event
  }
  return (
    <div className="faq-accordion">
    {orders.readGroupedOrderHistoryRecieved.length > 0?orders.readGroupedOrderHistoryRecieved.map((item:any, index:number) => (
        <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleAccordion(index)}>
            Order Number: {item.OrderNo}
            <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
            </div>
            {activeIndex === index && (
                <div className="faq-answer">
                  <div>Contact No:{item.Contact}</div>
                  <div>Shipping Address:{item.Address}</div>
                  <div>Order Status:<b>{item.OrderStatus}</b></div>

                  <h3>Ordered Items</h3>
                  <div className="NewOrderTableHead">
                    <div>Image</div>
                    <div>Product Code</div>
                    <div>Color</div>
                    <div>Size</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                  </div>
                   {item.OrderHistory.map((child:any,i:number)=>(
                  <div key={i} className="NewOrderTable">
                  <div className="NewOrderTableImgContainer"><Image 
                            src={child.Image === '' || child.Image === null ? path + 'image/Legitem-svg.svg' :  child.Image} 
                            alt={child.id}
                            onError={handleImage} 
                            height='60' 
                            width='80' 
                            className="NewOrderTableImg"
                            /></div>
                  <div>{child.productCode}</div>
                  <div>{child.Size}</div>
                  <div>{child.Color}</div>
                  <div>{formatter.format(child.Price)}</div>
                  <div>{child.Quantity}</div>
                  <div>
                    <input type='hidden' className='subtotal' value={child.Quantity * child.Price}/>
                    {formatter.format(child.Quantity * child.Price)}</div>
                  </div>
                  ))}
                  <div className="NewOrderTable">
                  <div className="NewOrderTotal"> 
                    <span>Total Amount :</span>
                    <span>
                    {
                      formatter.format(item.OrderHistory.reduce((acc: number, child: any) => {
                        const rowTotal = parseInt(child.Quantity) * parseFloat(child.Price);
                        let total:any = acc + rowTotal;
                        return total;
                      }, 0))
                    }
                    </span>
                    <span>VAT :</span><span>10%</span>
                    <span>Shipping Fee :</span><span>10%</span>
                    <span>Grand Total :</span>
                    <span>
                    {
                      formatter.format(item.OrderHistory.reduce((acc: number, child: any) => {
                        const rowTotal = parseInt(child.Quantity) * parseFloat(child.Price);
                        let total:any = acc + rowTotal;
                        return total + 0.1;
                      }, 0))
                    }
                    </span>
                    <span></span>
                    <span>
                      <button className="universalbutton" aria-current={item.OrderNo} onClick={(e:any)=>handlePacked(e)} disabled={isloading?true:false}>
                        {isloading?(<Icon icon="eos-icons:loading" />):"Pack Order"}
                      </button>
                    </span>
                  </div>
                  </div>
                </div>
            )}
        </div>
    )):<div className="faq-item">
            <div className="faq-question">No Data</div>
      </div>}
</div>
  );
}