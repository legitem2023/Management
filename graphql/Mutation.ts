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
