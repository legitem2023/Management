import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react'
import Select from 'components/Management/Management_ui/Select'
import React from 'react'
import { setGlobalState, useGlobalState } from 'state';
import { INSERT_CHILD_INVENTORY } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import CKEditorComponent from 'components/Management/Management_ui/CKEditorComponent';
import TextBox from 'components/Management/Management_ui/TextBox';
const InsertForm = ({InventoryRefetch,setToggleInsert,managementUrlData,managementUrlDataName,managementUrlDataCategory,managementUrlDataProductType,managementUrlDataProductBrand}) => {
  const [useEmail] = useGlobalState("cookieEmailAddress");
  const Manager = new DataManager();
  const [insertInventory] = useMutation(INSERT_CHILD_INVENTORY,{
    onCompleted: data => {
        if(data.insertChildInventory.statusText==="Successfully Inserted!"){
            Manager.Success(data.insertChildInventory.statusText);
            InventoryRefetch();
            setToggleInsert(0);
            return;
        }
    }
  })
 
  const [invFormDetailDataAdd] = useGlobalState("invFormDetailDataAdd");
  const formData = invFormDetailDataAdd;

 const CollapsibleStatus = () =>{
    const data = [{"Name":"Active"},{"Name":"Inactive"}];
    return data.map((item:any)=>{
        return {
            "Value":item.Name,
            "Text":item.Name
        }
    })
 }

const HandleSubmit = (e:any) =>{
    e.preventDefault();
    insertInventory({
        variables:{
            "emailAddress": useEmail,
            "category": managementUrlDataCategory,
            "productType": managementUrlDataProductType,
            "brandname": managementUrlDataProductBrand,
            "productName": managementUrlDataName,
            "styleCode":managementUrlData,
            "productStock":formData.Stock,
            "productPrice":formData.Price,
            "productColor":formData.Color,
            "productSize":formData.Size,    
            "productDescription":formData.Description,        
          }
    })
    return;
}

const HandleInputChange = (e:any) =>{

    const { name, value } = e.target;

    setGlobalState("invFormDetailDataAdd", (prevData) => ({
        ...prevData,
        [name]: value,
      }));
      return;
 }

 const ckEditorInputChange = (data) =>{
    const value = data;
    setGlobalState("invFormDetailDataAdd", (prevData) => ({
        ...prevData,
        ["Description"]: value,
      }));
      return;
 }


  return (
    <form onSubmit={HandleSubmit}className='UniversalFormFrame_B'>
        <div className='UniversalHeader'>
        <Icon icon="mdi:account" /> Create
        </div>
        <div>
        <TextBox Placeholder="Product Color" 
                     InitialText={""} 
                     Name="Color" 
                     function_event={HandleInputChange} 
                     Type="text"/>
            {/* <input type="text" placeholder="Color" name="Color" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div>  
        <div>
        <TextBox Placeholder="Product Size" 
                     InitialText={""} 
                     Name="Size" 
                     function_event={HandleInputChange} 
                     Type="text"/>
            {/* <input type="text" placeholder="Size" name="Size" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div> 
        <div>
        <TextBox Placeholder="Product Price" 
                     InitialText={""} 
                     Name="Price" 
                     function_event={HandleInputChange} 
                     Type="number"/>
            {/* <input type="number" placeholder="Price" name="Price" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div> 
        <div>
        <TextBox Placeholder="Product Stock" 
                     InitialText={""} 
                     Name="Stock" 
                     function_event={HandleInputChange} 
                     Type="number"/>
            {/* <input type="number" placeholder="Stock" name="Stock" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div> 
        <div>
            <Select Selected={"Active"} InitialText="Select Status" Name="Status" Data={CollapsibleStatus()} function_event={HandleInputChange}/>
        </div> 
        <div className='CKeditorContent'>
            <CKEditorComponent data={"Product Description"} onChange={ckEditorInputChange}/>
        </div>  
        <div>
            <input type='submit' value="Add"/>
        </div>   
    </form>
  )
}

export default InsertForm