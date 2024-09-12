import { gql } from "@apollo/client";
export const READLOGIN = gql`
mutation ReadLogin($username: String, $password: String) {
  ReadLogin(username: $username, password: $password) {
    statusText
    jsonToken
  }
}
`
export const UPDATE_ORDER_STATUS_RECEIVED = gql`
mutation UpdateOrderStatusRecieved($orderstatusParameter: OrderstatusParameter) {
  updateOrderStatusRecieved(OrderstatusParameter: $orderstatusParameter) {
    statusText
  }
}
`
export const UPDATE_ORDER_STATUS_PACKED = gql`
mutation UpdateOrderStatusPacked($orderstatusParameter: OrderstatusParameter) {
  updateOrderStatusPacked(OrderstatusParameter: $orderstatusParameter) {
    statusText
  }
}
`
export const UPDATE_ORDER_STATUS_LOGISTIC = gql`
mutation UpdateOrderStatusLogistic($orderstatusParameter: OrderstatusParameter) {
  updateOrderStatusLogistic(OrderstatusParameter: $orderstatusParameter) {
    statusText
  }
}
`
export const UPDATE_ORDER_STATUS_DELIVERY = gql`
mutation UpdateOrderStatusDelivery($orderstatusParameter: OrderstatusParameter) {
  updateOrderStatusDelivery(OrderstatusParameter: $orderstatusParameter) {
    statusText
  }
}
`
export const UPDATE_ORDER_STATUS_DELIVERED = gql`
mutation UpdateOrderStatusDelivered($orderstatusParameter: OrderstatusParameter) {
  updateOrderStatusDelivered(OrderstatusParameter: $orderstatusParameter) {
    statusText
  }
}
`

export const INSERT_NEW_ENCODER = gql`
mutation InsertUser($emailAddress: String, $password: String, $agentIdentity: String) {
  insertUser(emailAddress: $emailAddress, password: $password, agentIdentity: $agentIdentity) {
    statusText
  }
}
`

export const UPDATE_ACCOUNT_DETAILS = gql`
mutation UpdateAccountDetails($updateAccountDetailsInput: updateAccountDetailsInput) {
  updateAccountDetails(updateAccountDetailsInput: $updateAccountDetailsInput) {
    statusText
  }
}
`

export const INSERT_INVENTORY = gql`
mutation InsertInventory($emailAddress: String, $category: String, $productType: String, $brandname: String, $productName: String) {
  insertInventory(emailAddress: $emailAddress, category: $category, productType: $productType, brandname: $brandname, productName: $productName) {
    statusText
  }
}
`

export const UPDATE_CHILD_INVENTORY = gql`
mutation UpdateChildInventory($productColor: String, 
                              $productSize: String, 
                              $productPrice: String, 
                              $productStatus: String, 
                              $productStock: String, 
                              $productDescription: String, 
                              $updateChildInventoryId: Int, 
                              $email: String) {
  updateChildInventory(productColor: $productColor, 
                       productSize: $productSize, 
                       productPrice: $productPrice, 
                       productStatus: $productStatus, 
                       productStock: $productStock, 
                       productDescription: $productDescription, 
                       id: $updateChildInventoryId, 
                       Email: $email) {
    statusText
  }
}
`