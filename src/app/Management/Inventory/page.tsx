"use client"
import React, { useEffect } from 'react'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import { Icon } from '@iconify/react'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES, MANAGEMENT_INVENTORY, UPDATE_PARENT_INVENTORY } from 'graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import TimestampConverter from 'components/timestamp/TimestampConverter'
import { setGlobalState, useGlobalState } from 'state'
import { useRouter } from 'next/navigation'
import StatisticsPagination from 'components/Management/ManagementStatistics/StatisticsPagination'
// import { getCookie } from 'components/Management/Management_cookies/Management_cookies'
import { category, productBrand, productType, status } from 'utils/extraFetch'
const Inventory = () => {
  useEffect(() => {
    // const cookie = getCookie("token");
    // if (!cookie) document.location.href = '../Management';
  }, []);
  const [useEmail] = useGlobalState("cookieEmailAddress");
  const [activate, setActivation] = React.useState(false)
  const [useID, setID] = React.useState(0)
  const [useProductType, setProductType] = React.useState("");
  const [useInitSlice] = useGlobalState("setInitSlice");

  const [UpdateParentInventory] = useMutation(UPDATE_PARENT_INVENTORY, {
    onCompleted: data => console.log(data)
})
  const path = process.env.NEXT_PUBLIC_PATH
  const { data:Category } = useQuery(GET_CATEGORY);
  const { data:Product_Type } = useQuery(GET_PRODUCT_TYPES);
  const { data:Brands } = useQuery(GET_BRANDS);
  const router = useRouter();
  const { data:Inventory, loading: inventoryLoading } = useQuery(MANAGEMENT_INVENTORY);
  if (inventoryLoading) return

  const activateEdit = (e: any) => {
    let checkbox: any = e.target.getAttribute("aria-current");
    setID(checkbox)
    setActivation(e.target.checked)
    if (e.target.checked) {
      setGlobalState("editingMode", true);
      setGlobalState("rowNumber", e.target.getAttribute("aria-label"));

    } else {
      setGlobalState("editingMode", false)
      setGlobalState("rowNumber", 0);

    }
  }


  let itemsPerPage = 10;
  let currentPage = useInitSlice;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const totalItems = Inventory.getParentInventory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const navigateTodetail = (e: any) => {
    const url = e.target.getAttribute("aria-label");
    router.push(url);
  }

  const ParentProductData = () => {
    return Inventory.getParentInventory.slice(startIndex, endIndex).map((item: any, idx: any) => (
      <div key={idx} className='InventoryBody'>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
          <label>
            <input type="checkbox" id={"edit" + item.id} className='hidden' aria-current={item.id} aria-label={idx + 1} onChange={activateEdit}></input>
            <Icon icon="bxs:edit" className='management_edit' />
          </label>
        </div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "name" + useID === "name" + item.id ? <input type='text' onChange={(e: any) => handleEdit(e)} aria-current={item.id} defaultValue={item.name} placeholder="Input Name..." id={'name' + item.id}></input> : item.name === null || item.name === "" ? "Input Name..." : item.name : item.name === null || item.name === "" ? "Input Name..." : item.name}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "category" + useID === "category" + item.id ? category(item.category, item.id,Category,handleEdit) : item.category === null || item.category === "" ? "Select Category" : item.category : item.category === null || item.category === "" ? "Select Category" : item.category}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "Ptype" + useID === "Ptype" + item.id ? productType(item.productType, item.id, Product_Type,handleEdit) : item.productType === null || item.productType === "" ? "Select Product Type" : item.productType : item.productType === null || item.productType === "" ? "Select Product Type" : item.productType}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "BrandName" + useID === "BrandName" + item.id ? productBrand(item.brandname, item.id,Brands,handleEdit) : item.brandname === null || item.brandname === "" ? "Select Product Brand" : item.brandname : item.brandname === null || item.brandname === "" ? "Select Product Brand" : item.brandname}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "id" + useID === "id" + item.id ? status(item.status, item.id,handleEdit) : item.status === null || item.status === "" ? "Select Status" : item.status : item.status === null || item.status === "" ? "Select Status" : item.status}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><TimestampConverter timestamp={item.dateCreated} /></div>
        <div className={'InventoryBodyCell InventoryBodyCell_det' + ' InventoryBodyCell' + item.id}><button className={item.name === "" || item.category === "" || item.productType === "" ? 'details_linkDisabled details_link' : 'details_linkEnabled' + ' details_link'} aria-current={item.id} onClick={(e) => navigateTodetail(e)} aria-label={path + "Management/Inventory/Details/?style=" + item.styleCode} disabled={item.name === "" || item.category === "" || item.productType === "" ? true : false}>Details({item.childInventory.length})</button></div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
          <Icon icon="material-symbols:delete-sharp" className='management_delete' />
          <Icon icon="carbon:view-filled" />
        </div>
        <div className='management_divider'></div>
      </div>
    ))
  }

  const handleEdit = (e: any) => {
    const productId: any = e.target.getAttribute("aria-current");
    const productName = (document.getElementById("name" + productId) as HTMLInputElement).value
    const productCategory = (document.getElementById("category" + productId) as HTMLInputElement).value
    const productType = (document.getElementById("Ptype" + productId) as HTMLInputElement).value
    const brandname = (document.getElementById("brand" + productId) as HTMLInputElement).value
    const status = (document.getElementById("status" + productId) as HTMLInputElement).value
    setProductType(productCategory);
    const JSON = {
      "productId": parseInt(productId),
      "category": productCategory,
      "productType": productType,
      "brandname": brandname,
      "productName": productName,
      "status": status
    }
    UpdateParentInventory({
      variables: JSON,
      refetchQueries: [{
        query: MANAGEMENT_INVENTORY
      }]
    })
    console.log(JSON);
  }

  const jump_to_page = (e: any) => {
    const id = e.target.value;
    setGlobalState("setInitSlice", id)
  }

  const ListPages = () => {
    const data = [];
    for (let index = 1; index < totalPages + 1; index++) {
      data.push(index)
    }
    return (
      <select onChange={(e) => jump_to_page(e)} value={useInitSlice}>
        {data.map((item: any, idx: any) => (
          <option key={idx} value={item}>{item}</option>
        ))}
      </select>
    )
  }

  return (
    <div className='Main'>
      <div className='ManagementBody'>
        <ManagementHeader />
        <ManagementDrawer />
        <ManagementNavigation />
        <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='material-symbols:inventory-sharp' /> Inventory</div>
          <ManagementSearch />
          <div className='PaginationContainer'>
            <div>
              <StatisticsPagination InitSlice={useInitSlice} Pages={totalPages}></StatisticsPagination>
            </div>
            <div>
              Jump to page :{ListPages()}
            </div>

          </div>
          <div className='InventoryTable'>
            <div className='InventoryHead'>
              <div>No.</div>
              <div>Name</div>
              <div>Category</div>
              <div>Product Type</div>
              <div>Brand</div>
              <div>Status</div>
              <div>Date Created</div>
              <div>Details</div>
              <div>Action</div>
            </div>
            {ParentProductData()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory