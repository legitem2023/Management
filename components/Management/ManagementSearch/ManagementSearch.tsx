import React from 'react'
import {GET_CATEGORY, GET_PRODUCT_TYPES, GET_BRANDS } from 'graphql/queries';
import { setGlobalState, useGlobalState } from 'state';

import { useQuery } from '@apollo/client';
import Select from '../Management_ui/Select';
import Loading from 'components/LoadingAnimation/Loading';
const ManagementSearch = () => {

  const [productCategory] = useGlobalState("productCategory");
  const [productType] = useGlobalState("productType");
  const [productBrand] = useGlobalState("productBrand");
  const [ItemPerpage] = useGlobalState("ItemPerpage");
  const { data:Category, loading:Category_loading } = useQuery(GET_CATEGORY);
  const { data:Product_Type,loading:Product_loading } = useQuery(GET_PRODUCT_TYPES);
  const { data:Brands,loading:Brand_loading } = useQuery(GET_BRANDS);

  if(Category_loading) return <Loading/>;
  if(Product_loading) return <Loading/>;
  if(Brand_loading) return <Loading/>;
  
 const CollapsibleCategory = () =>{
    return Category.getCategory.map((item: any) => {
        return {
            "Value": item.Name,
            "Text": item.Name
        }
    })
 }

 const CollapsibleProductType = () =>{
    return Product_Type.getProductTypes.map((item: any) => {
        return {
            "Value": item.Name,
            "Text": item.Name
        }
    })
 }

 const CollapsibleBrandName = () =>{
    return Brands.getBrand.map((item: any) => {
        return {
            "Value": item.Name,
            "Text": item.Name
        }
    })
 }

 const CollapsiblePages = () =>{
  const data = [{"Name":"20"},{"Name":"50"},{"Name":"100"}];
  return data.map((item:any)=>{
      return {
          "Value":item.Name,
          "Text":item.Name
      }
  })
}


  return (
    <div className='Search_container'>
      <div className='Search_container_grid'>
        <div className='SortColumn'>
          <input type='text' placeholder='Search By Name' onChange={(e:any)=>setGlobalState("productSearch",e.target.value)}></input>
        </div>
        <div className='SortColumn'>
          <Select Selected={productType} InitialText="Select Product Type" Name="ProductType" Data={CollapsibleProductType()} function_event={(e:any)=>{setGlobalState("productType",e.target.value)}}/>
        </div>
        <div className='SortColumn'>
          <Select Selected={productBrand} InitialText="Select Product Brand" Name="Brandname" Data={CollapsibleBrandName()} function_event={(e:any)=>{setGlobalState("productBrand",e.target.value)}}/>
        </div>
        <div className='SortColumn'>
          <Select Selected={productCategory} InitialText="Select Category" Name="Category" Data={CollapsibleCategory()} function_event={(e:any)=>{setGlobalState("productCategory",e.target.value)}}/>
        </div>
        <div className='SortColumn'>
          <Select Selected={ItemPerpage} InitialText="10" Name="Pages" Data={CollapsiblePages()} function_event={(e:any)=>{setGlobalState("ItemPerpage",e.target.value)}}/>
        </div>
      </div>
    </div>
  )
}

export default ManagementSearch