
import { gql } from "@apollo/client"
//*************** QUERIES ***************/
export const READ_ORDERS = gql`
query ReadGroupedOrderHistory($emailAddress: String) {
  readGroupedOrderHistory(emailAddress: $emailAddress) {
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
}`

export const READ_ORDERS_RECIEVED = gql`
query ReadGroupedOrderHistoryRecieved($emailAddress: String) {
  readGroupedOrderHistoryRecieved(emailAddress: $emailAddress) {
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
}`

export const READ_ORDERS_PACKED = gql`
query ReadGroupedOrderHistoryPacked($emailAddress: String) {
  readGroupedOrderHistoryPacked(emailAddress: $emailAddress) {
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
}`

export const READ_ORDERS_LOGISTIC = gql`
query ReadGroupedOrderHistoryLogistic($emailAddress: String) {
  readGroupedOrderHistoryLogistic(emailAddress: $emailAddress) {
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
}`

export const READ_ORDERS_DELIVERY = gql`
query ReadGroupedOrderHistoryDelivery($emailAddress: String) {
  readGroupedOrderHistoryDelivery(emailAddress: $emailAddress) {
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
}`

export const READ_ORDERS_DELIVERED = gql`
query ReadGroupedOrderHistoryDelivered($emailAddress: String) {
  readGroupedOrderHistoryDelivered(emailAddress: $emailAddress) {
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
}`

export const READ_PERSONAL_MESSAGES = gql`
query PersonalMessages($emailAddress: String) {
  personalMessages(emailAddress: $emailAddress) {
    id
    Messages
    Sender
    Reciever
    dateSent
  }
}
`
export const GROUP_SENDER = gql`
query ReadGroupSender($emailAddress: String) {
  readGroupSender(emailAddress: $emailAddress) {
    id
    Messages
    Sender
    Reciever
    dateSent
  }
}
`



export const GET_MESSAGES = gql`
query Messages {
  messages {
    id
    Messages
    Sender
    dateSent
  }
}`
export const GET_NAME_OF_STORE = gql`
query GetNameofStore {
  getNameofStore {
    nameOfStore
    image
    id
    email
  }
}`
export const GET_CHILD_INVENTORY = gql`
query GetChildInventory {
  getChildInventory {
    id
    thumbnail
    price
    productCode
    name
    category
    style_Code
  }
}`

export const GET_CHILD_INVENTORY_DETAIL = gql`
query GetChildInventory_details($styleCode: String) {
  getChildInventory_details(styleCode: $styleCode) {
    id
    name
    agentEmail
    category
    color
    creator
    dateCreated
    dateUpdated
    editor
    price
    imageReferences
    productCode
    productType
    size
    status
    stock
    style_Code
    thumbnail
    productDescription
    subImageFieldOut {
      ImagePath
      id
      subImageRelationChild
      subImageRelationParent
    }
  }
}
`
export const GET_CATEGORY = gql`
query GetCategory {
  getCategory {
    Name
    icon
    id
    image
    status
  }
}`
export const GET_RELATED_PRODUCTS = gql`
query GetRelatedProduct {
  getRelatedProduct {
    id
    thumbnail
    price
    size
    color
    name
    model
  }
}`
export const GET_VIEW_PRODUCT = gql`
 query GetToviewProduct($getToviewProductId: Int) {
  getToviewProduct(id: $getToviewProductId) {
    agentEmail
    model
    category
    color
    creator
    dateCreated
    dateUpdated
    editor
    id
    imageReferences
    name
    parentId
    price
    productCode
    productType
    size
    status
    stock
    style_Code
    thumbnail
    subImageFieldOut {
      ImagePath
      id
      subImageRelationChild
      subImageRelationParent
    }
  }
}`
export const GET_LOGIN = gql`
query GetLogin($username: String, $password: String) {
  getLogin(username: $username, password: $password) {
    jsonToken
    statusText
  }
}`
export const MANAGEMENT_INVENTORY = gql`
query GetParentInventory($emailAddress: String) {
  getParentInventory(EmailAddress: $emailAddress) {
    id
    styleCode
    name
    productType
    status
    agentEmail
    brandname
    category
    collectionItem
    dateCreated
    dateUpdated
    childInventory {
      agentEmail
      category
      productType
      brandname
      color
      creator
      dateCreated
      dateUpdated
      editor
      id
      name
      productDescription
    }
  }
}`
export const GET_ACCOUNTS = gql`
query GetUser {
  getUser {
    accountCode
    accountLevel
    agentIdentity
    dateCreated
    dateUpdated
    email
    image
    loginAttemp
    macAddress
    nameOfStore
    password
    accountDetails {
      id
      userId
      fullname
      storeName
      contactNo
      Address
      accountEmail
      defaultAddress
    }
  }
}`
export const GET_ACCOUNT_DETAILS = gql`
query GetAccountDetails {
  getAccountDetails {
    id
    userId
    storeName
    fullname
    contactNo
    accountEmail
    Address
  }
}`
export const GET_ACCOUNT_DETAILS_ID = gql`
query GetAccountDetails($getAccountDetailsIdId: String) {
  getAccountDetails_id(id: $getAccountDetailsIdId) {
    id
    userId
    storeName
    fullname
    contactNo
    accountEmail
    Address
  }
}`

export const GET_FILTERED_USERS = gql`
query GetFilteredUser($userLevel: String, $emailAddress: String) {
  getFilteredUser(UserLevel: $userLevel, emailAddress: $emailAddress) {
    id
    email
    accountCode
    accountDetails {
      id
      userId
      fullname
      storeName
      contactNo
      Address
      accountEmail
      defaultAddress
    }
    password
    accountLevel
    loginAttemp
    macAddress
    agentIdentity
    image
    dateCreated
    dateUpdated
    nameOfStore
  }
}
`

export const GET_PRODUCT_TYPES = gql`
query GetProductTypes {
  getProductTypes {
    Category
    Name
    id
  }
}`
export const GET_BRANDS = gql`
query GetBrand {
  getBrand {
    Name
    ProductType
    id
  }
}`
export const GET_NUM_OF_VIEWS = gql`
query GetNumberOfViews {
  getNumberOfViews {
    Country
    IpAddress
    count
    emailAddress
    id
    productCode
    dateVisited
  }
}`
export const GET_WEBSITE_VISITS = gql`
query GetWebsitVisits {
  getWebsitVisits {
    id
    Country
    IpAddress
    dateVisited
  }
}`
export const GET_LOCATION_DATA = gql`
query GetIp($ipAddress: String) {
  getIp(ipAddress: $ipAddress) {
    IpAddress
  }
}`
export const GET_INVENTORY_SUB_IMAGES = gql`
query GetInv_subImage {
  getInv_subImage {
    ImagePath
    id
    subImageRelationChild
    isVideo
  }
}`
//*************** QUERIES ***************/

//*************** MUTATION ***************/

export const INSERT_VIEWS_COUNT = gql`
mutation Mutation($count: String, $productCode: String, $emailAddress: String, $ipAddress: String, $country: String) {
  insertNumberOfViews(count: $count, productCode: $productCode, emailAddress: $emailAddress, IpAddress: $ipAddress, Country: $country) {
    jsonToken
    statusText
  }
}
`
export const INSERT_VISITS = gql`
mutation Mutation($emailAddress: String, $ipAddress: String, $country: String) {
  insertNumberOfVisit(emailAddress: $emailAddress, IpAddress: $ipAddress, Country: $country) {
    jsonToken
    statusText
  }
}
`


export const UPDATE_PARENT_INVENTORY = gql`
mutation Mutation($productId: Int, $category: String, $productType: String, $brandname: String, $productName: String, $status: String) {
  updateParentInventory(productID: $productId, category: $category, productType: $productType, brandname: $brandname, productName: $productName, status: $status) {
    jsonToken
    statusText
  }
}
`
export const SAVE_CROP_IMAGE = gql`
mutation Mutation($saveCropImageId: Int, $file: Upload) {
  saveCropImage(id: $saveCropImageId, file: $file) {
    jsonToken
    statusText
  }
}
`
export const SEND_MESSAGE = gql`
mutation PostMessage($message: String, $sender: String) {
  postMessage(Message: $message, Sender: $sender) {
    id
    Messages
    Sender
    dateSent
  }
}`

//*************** MUTATION ***************/

export const MESSAGE_ADDED = gql`
subscription Subscription {
  messageAdded {
    id
    Messages
    Sender
    dateSent
  }
}`

export const NEWS_MANAGEMENT = gql`
query ReadNewsManagement($emailAddress: String) {
  readNewsManagement(emailAddress: $emailAddress) {
    id
    title
    thumbnail
    summary
    postedBy
    dateCreated
  }
}
`

export const READ_PRIVACY = gql`
query ReadPrivacy {
  readPrivacy {
    id
    content
  }
}
`

export const READ_DISCLAIMER = gql`
query ReadDisclaimer {
  readDisclaimer {
    id
    content
  }
}
`