import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react'
import Loading from 'components/LoadingAnimation/Loading';
import Select from 'components/Management/Management_ui/Select'
import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES } from 'graphql/queries';
import React from 'react'
import { setGlobalState, useGlobalState } from 'state';
import { INSERT_INVENTORY } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import { ToastContainer } from 'react-toastify';
const InsertForm = ({InventoryRefetch}) => {
  const [useEmail] = useGlobalState("cookieEmailAddress");

  const [categoryFilter] = useGlobalState("categoryFilter");
  const [productTypeFilter] = useGlobalState("productTypeFilter"); 
  const { data:Category, loading:Category_loading } = useQuery(GET_CATEGORY);
  const { data:Product_Type,loading:Product_loading } = useQuery(GET_PRODUCT_TYPES);
  const { data:Brands,loading:Brand_loading } = useQuery(GET_BRANDS);
  const Manager = new DataManager();

  const [insertInventory] = useMutation(INSERT_INVENTORY,{
    onCompleted: data => {
        if(data.insertInventory.statusText==='Successfully!'){
            Manager.Success(data.insertInventory.statusText);
            InventoryRefetch();
        }
    }
  })
 
 
  const [invFormDataAdd] = useGlobalState("invFormDataAdd");
  if(Category_loading) return <Loading/>;
  if(Product_loading) return <Loading/>;
  if(Brand_loading) return <Loading/>;
  const formData = invFormDataAdd;

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
 const filter = (e:any) =>{
    setGlobalState("categoryFilter",e.target.value)
 }
 const filterProdType = (e:any) =>{
    setGlobalState("productTypeFilter",e.target.value)
 }

const HandleSubmit = (e:any) =>{
    e.preventDefault();
    insertInventory({
        variables:{
            "emailAddress": useEmail,
            "category": formData.Category,
            "productType": formData.ProductType,
            "brandname": formData.Brandname,
            "productName": formData.Name
          }
    })
}

const HandleInputChange = (e:any) =>{
    const { name, value } = e.target;
    console.log(formData)
    setGlobalState("invFormDataAdd", (prevData) => ({
        ...prevData,
        [name]: value,
      }));
 }



  return (
    <form onSubmit={HandleSubmit}className='UniversalFormFrame'>
        <div className='UniversalHeader'>
        <Icon icon="mdi:account" /> Create
        </div>
        <div>
            <input type="text" value={formData.Name} placeholder="Name" name="Name" autoComplete="new-password" onChange={HandleInputChange}required/>
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
            <input type='submit' value="Add"/>
        </div>   
        {/* <ToastContainer></ToastContainer>   */}
    </form>
  )
}

export default InsertForm