import { gql } from "@apollo/client"
//*************** subscription ***************/
export const ORDER_STATUS_SUBSCRIPTION = gql`
subscription MessageToOrder {
  messageToOrder {
    TrackingNo
    Address
    Contact
    StatusText
    OrderStatus
    OrderHistory {
      id
      Image
      Size
      Color
      productCode
      emailAddress
      TrackingNo
      OrderNo
      Quantity
      Price
      Address
      Contact
      StoreEmail
      dateCreated
      agentEmail
      StatusText
    }
  }
}
`;