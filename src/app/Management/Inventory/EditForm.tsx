import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react'
import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES, UPDATE_PARENT_INVENTORY } from 'graphql/queries';
import React from 'react'
import Select from 'components/Management/Management_ui/Select'
import Loading from 'components/LoadingAnimation/Loading';
import { setGlobalState, useGlobalState } from 'state';
import TextBox from 'components/Management/Management_ui/TextBox';
import DataManager from 'utils/DataManager';
const EditForm = ({InventoryRefetch}) => {
  const [categoryFilter] = useGlobalState("categoryFilter");
  const [productTypeFilter] = useGlobalState("productTypeFilter"); 
  const [invFormDataEdit] = useGlobalState("invFormDataEdit");
  const Manager = new DataManager();
  const { data:Category, loading:Category_loading } = useQuery(GET_CATEGORY);
  const { data:Product_Type,loading:Product_loading } = useQuery(GET_PRODUCT_TYPES);
  const { data:Brands,loading:Brand_loading } = useQuery(GET_BRANDS);

  const [UpdateParentInventory] = useMutation(UPDATE_PARENT_INVENTORY, {
    onCompleted: data => {
        if(data.updateParentInventory.statusText==='Success!'){
            Manager.Success(data.updateParentInventory.statusText);
            InventoryRefetch();
        }
    }
})


  if(Category_loading) return <Loading/>;
  if(Product_loading) return <Loading/>;
  if(Brand_loading) return <Loading/>;
  
    
  const formData = invFormDataEdit;

 const CollapsibleCategory = () =>{
    return Category.getCategory.map((item: any) => {
        return {
            "Value": item.Name,
            "Text": item.Name
        }
    })
 }

 const CollapsibleProductType = () => {
    return categoryFilter === "Select Category"
      ? Product_Type.getProductTypes.map((item: any) => ({
          Value: item.Name,
          Text: item.Name
        }))
      : Product_Type.getProductTypes
          .filter((item: any) => item.Category === categoryFilter)
          .map((item: any) => ({
            Value: item.Name,
            Text: item.Name
          }));
  };
  


 const CollapsibleBrandName = () =>{
    return Brands.getBrand.map((item: any) => {
        return {
            "Value": item.Name,
            "Text": item.Name
        }
    })
 }

 const CollapsibleStatus = () =>{
    const data = [{"Name":"Active"},{"Name":"Inactive"}];
    return data.map((item:any)=>{
        return {
            "Value":item.Name,
            "Text":item.Name
        }
    })
 }

 const HandleInputChange = (e:any) =>{
    const { name, value } = e.target;

    setGlobalState("invFormDataEdit", (prevData) => ({
        ...prevData,
        [name]: value,
      }));
 }

 const handleSubmit = (e) =>{
    e.preventDefault();
    UpdateParentInventory({
        variables:{
            "productId": formData.Id,
            "category": formData.Category,
            "productType": formData.ProductType,
            "brandname": formData.Brandname,
            "productName": formData.Name,
            "status": formData.Status
          }
    })

    InventoryRefetch();

 }

  return (
    <form onSubmit={handleSubmit} className='UniversalFormFrame'>
        <div className='UniversalHeader'>
        <Icon icon="mdi:account" /> Modify
        </div>        
        <div>
            <TextBox Placeholder={"Name"} InitialText={formData.Name} Name={"Name"} function_event={HandleInputChange} Type={"text"}/>
        </div>
        <div>
            <Select Selected={formData.Category} InitialText="Select Category" Name="Category" Data={CollapsibleCategory()} function_event={HandleInputChange}/>
        </div>
        <div>
            <Select Selected={formData.ProductType} InitialText="Select Product Type" Name="ProductType" Data={CollapsibleProductType()} function_event={HandleInputChange}/>
        </div>
        <div>
            <Select Selected={formData.Brandname} InitialText="Select Product Brand" Name="Brandname" Data={CollapsibleBrandName()} function_event={HandleInputChange}/>
        </div>
        <div>
            <Select Selected={formData.Status} InitialText="Select Status" Name="Status" Data={CollapsibleStatus()} function_event={HandleInputChange}/>
        </div>     
        <div>
            <input type='submit' value="Save"/>
        </div>   
    </form>
  )
}

export default EditForm