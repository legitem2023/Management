"use client"
import React, { useState } from 'react'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import { Icon } from '@iconify/react'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import { MANAGEMENT_INVENTORY } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { setGlobalState, useGlobalState } from 'state'
import StatisticsPagination from 'components/Management/ManagementStatistics/StatisticsPagination'
import Management_inventory from 'components/Management/Management_inventory/Management_inventory'
import EditForm from './EditForm'
import InsertForm from './InsertForm'
const Inventory = () => {

  const [useInitSlice] = useGlobalState("setInitSlice");
  const [useToggle,setToggle] = useState(0);
  const [useToggleInsert,setToggleInsert] = useState(0)
  const [productSearch] = useGlobalState("productSearch");
  const [productType] = useGlobalState("productType");
  const [productCategory] = useGlobalState("productCategory");
  const [productBrand] = useGlobalState("productBrand");
  const [ItemPerpage] = useGlobalState("ItemPerpage");

  const { data:Inventory, loading: inventoryLoading,refetch:InventoryRefetch } = useQuery(MANAGEMENT_INVENTORY);

  if (inventoryLoading) return
  const searchInventory =  Inventory?.getParentInventory?.filter((item: any) =>item.name.includes(productSearch));
  const sortProductType = productType==="Select Product Type"?searchInventory:searchInventory.filter((item:any) => item.productType.includes(productType));
  const sortProductCategory = productCategory==="Select Category"?sortProductType:sortProductType.filter((item:any) => item.category.includes(productCategory));
  const sortProductBrand = productBrand==="Select Product Brand"?sortProductCategory:sortProductCategory.filter((item:any) => item.brandname.includes(productBrand));

  let itemsPerPage:any = ItemPerpage;
  let currentPage = useInitSlice;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const totalItems = sortProductBrand.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
          <button className='addNewItemButton' onClick={()=>setToggleInsert(1)}>
            <Icon icon="ic:round-add-box" className="addNewItem"/>
          </button>

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
            <Management_inventory setToggle={setToggle} data={sortProductBrand.slice(startIndex, endIndex)}/>
          </div>
          <div className='PaginationContainer'>
            <div>
              <StatisticsPagination InitSlice={useInitSlice} Pages={totalPages}></StatisticsPagination>
            </div>
            <div>
              Jump to page :{ListPages()}
            </div>
          </div>
        </div>
        <div className='Universal_cover' style={{'transform':`scale(${useToggle})`}}>
          <Icon icon="eva:close-square-fill" 
                style={{color: '#ff0000',fontSize:'40px',cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} 
                onClick={() => setToggle(0)}/>
            <EditForm InventoryRefetch={InventoryRefetch}/>
        </div>
        <div className='Universal_cover' style={{'transform':`scale(${useToggleInsert})`}}>
          <Icon icon="eva:close-square-fill" 
                style={{color: '#ff0000',fontSize:'40px',cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} 
                onClick={() => setToggleInsert(0)}/>
            <InsertForm  InventoryRefetch={InventoryRefetch}/>
        </div>
      </div>
    </div>
  )
}

export default Inventory