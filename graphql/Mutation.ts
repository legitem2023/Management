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

export const POSTPERSONAL_MESSAGES = gql`
mutation PostPersonalMessage($message: String, $sender: String, $reciever: String) {
  postPersonalMessage(Message: $message, Sender: $sender, Reciever: $reciever) {
    id
    Messages
    Sender
    Reciever
    dateSent
  }
}
`

export const DELETE_CHILD_INVENTORY = gql`
mutation DeleteChildInventory($deleteChildInventoryId: Int) {
  deleteChildInventory(id: $deleteChildInventoryId) {
    statusText
  }
}`

export const INSERT_CHILD_INVENTORY = gql`
mutation InsertChildInventory($emailAddress: String, $category: String, $productType: String, $brandname: String, $productName: String, $styleCode: String, $productStock: String, $productPrice: String, $productColor: String, $productSize: String, $productDescription: String) {
  insertChildInventory(emailAddress: $emailAddress, category: $category, productType: $productType, brandname: $brandname, productName: $productName, styleCode: $styleCode, productStock: $productStock, productPrice: $productPrice, productColor: $productColor, productSize: $productSize, productDescription: $productDescription) {
    statusText
  }
}
`

export const INSERT_NEWS = gql`
mutation InsertNews($newsInput: NewsInput) {
  insertNews(NewsInput: $newsInput) {
    statusText
  }
}
`

export const UPDATE_NEWS = gql`
mutation UpdateNews($newsInput: NewsInput) {
  updateNews(NewsInput: $newsInput) {
    statusText
  }
}
`

export const DELETE_NEWS = gql`
mutation DeleteNews($param: String) {
  deleteNews(param: $param) {
    statusText
  }
}
`

export const INSERT_PRIVACY = gql`
mutation InsertPrivacy($content: String) {
  insertPrivacy(content: $content) {
    statusText
  }
}
`

export const DELETE_PRIVACY = gql`
mutation DeletePrivacy($deletePrivacyId: String) {
  deletePrivacy(id: $deletePrivacyId) {
    statusText
  }
}
`

export const DELETE_DISCLAIMER = gql`
mutation DeleteDisclaimer($deleteDisclaimerId: String) {
  deleteDisclaimer(id: $deleteDisclaimerId) {
    statusText
  }
}
`

export const INSERT_DISCLAIMER = gql`
mutation InsertDisclaimer($content: String) {
  insertDisclaimer(content: $content) {
    statusText
  }
}
`