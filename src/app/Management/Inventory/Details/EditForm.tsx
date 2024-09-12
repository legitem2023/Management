import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react'
import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES, UPDATE_PARENT_INVENTORY } from 'graphql/queries';
import { UPDATE_CHILD_INVENTORY } from 'graphql/Mutation';
import React from 'react'
import Select from 'components/Management/Management_ui/Select'
import Loading from 'components/LoadingAnimation/Loading';
import { setGlobalState, useGlobalState } from 'state';
import TextBox from 'components/Management/Management_ui/TextBox';
import DataManager from 'utils/DataManager';
import CKEditorComponent from 'components/Management/Management_ui/CKEditorComponent';
import { decode, encode } from 'js-base64';
const EditForm = ({InventoryRefetch}) => {
    const [useEmail] = useGlobalState("cookieEmailAddress");
  const [categoryFilter] = useGlobalState("categoryFilter");
  const [productTypeFilter] = useGlobalState("productTypeFilter"); 
  const [invFormDetailDataEdit] = useGlobalState("invFormDetailDataEdit");
  const Manager = new DataManager();
  const { data:Category, loading:Category_loading } = useQuery(GET_CATEGORY);
  const { data:Product_Type,loading:Product_loading } = useQuery(GET_PRODUCT_TYPES);
  const { data:Brands,loading:Brand_loading } = useQuery(GET_BRANDS);

  const [UpdateChildInventory] = useMutation(UPDATE_CHILD_INVENTORY, {
    onCompleted: data => {
        if(data.updateChildInventory.statusText==='Success!'){
            Manager.Success(data.updateChildInventory.statusText);
            InventoryRefetch();
        }
    }
})


  if(Category_loading) return <Loading/>;
  if(Product_loading) return <Loading/>;
  if(Brand_loading) return <Loading/>;
  
    
  const formData = invFormDetailDataEdit;

  console.log(formData)
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
    setGlobalState("invFormDetailDataEdit", (prevData) => ({
        ...prevData,
        [name]: value,
      }));
 }
 const ckEditorInputChange = (data) =>{
    const value = data;
    setGlobalState("invFormDetailDataEdit", (prevData) => ({
        ...prevData,
        ["Description"]: value,
      }));
 }
 const handleSubmit = (e) =>{
    e.preventDefault();
    UpdateChildInventory({
        variables:{
            "productColor": formData.Color,
            "productSize": formData.Size,
            "productStatus": formData.Status,
            "productDescription": formData.Description,
            "updateChildInventoryId": formData.Id,
            "email": useEmail
          }
    })
    InventoryRefetch();
 }
 console.log(formData)
  return (
    <form onSubmit={handleSubmit} className='UniversalFormFrame'>
       <div className='UniversalHeader'>
        <Icon icon="mdi:account" /> Modify
        </div>
        <div>
            <input type="text" value={formData.Color} placeholder="Color" name="Color" autoComplete="new-password" onChange={HandleInputChange}required/>
        </div>  
        <div>
            <input type="text" value={formData.Size} placeholder="Size" name="Size" autoComplete="new-password" onChange={HandleInputChange}required/>
        </div> 
        <div>
            <input type="text" value={formData.Price} placeholder="Price" name="Price" autoComplete="new-password" onChange={HandleInputChange}required/>
        </div> 
        <div>
            <input type="text" value={formData.Stock} placeholder="Stock" name="Stock" autoComplete="new-password" onChange={HandleInputChange}required/>
        </div> 
        <div>
            <Select Selected={formData.Status} InitialText="Select Status" Name="Status" Data={CollapsibleStatus()} function_event={HandleInputChange}/>
        </div> 
        <div className='CKeditorContent'>
            <CKEditorComponent data={formData.Description===null?"Product Description":formData.Description} onChange={ckEditorInputChange}/>
        </div>
        <div>
            <input type='submit' value="Add"/>
        </div>  
    </form>
  )
}

export default EditForm