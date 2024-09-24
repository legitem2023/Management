import { gql } from "@apollo/client"
//*************** subscription ***************/
export const ORDER_STATUS_SUBSCRIPTION = gql`
subscription MessageToOrder {
  messageToOrder {
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
    OrderStatus
  }
}
`;

export const PERSONAL_MESSAGES_ADDED = gql`
subscription MessagesPersonal {
  messagesPersonal {
    id
    Messages
    Sender
    Reciever
    dateSent
  }
}
`