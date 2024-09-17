import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react'
// import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES, UPDATE_PARENT_INVENTORY } from 'graphql/queries';
import { UPDATE_CHILD_INVENTORY } from 'graphql/Mutation';
import React from 'react'
import Select from 'components/Management/Management_ui/Select'
// import Loading from 'components/LoadingAnimation/Loading';
import { setGlobalState, useGlobalState } from 'state';
// import TextBox from 'components/Management/Management_ui/TextBox';
import DataManager from 'utils/DataManager';
import CKEditorComponent from 'components/Management/Management_ui/CKEditorComponent';
import TextBox from 'components/Management/Management_ui/TextBox';

const EditForm = ({InventoryRefetch,setToggle}) => {
  const [useEmail] = useGlobalState("cookieEmailAddress"); 
  const [invFormDetailDataEdit] = useGlobalState("invFormDetailDataEdit");
  const Manager = new DataManager();
// 
  const [UpdateChildInventory] = useMutation(UPDATE_CHILD_INVENTORY, {
    onCompleted: data => {
        if(data.updateChildInventory.statusText==='Successfuly Save!'){
            Manager.Success(data.updateChildInventory.statusText);
            InventoryRefetch();
            setToggle(0);
        }
    }
})


  
    
  const formData = invFormDetailDataEdit;

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
            "productStock": formData.Stock,
            "productStatus": formData.Status,
            "productPrice": formData.Price,
            "productDescription": formData.Description,
            "updateChildInventoryId": formData.Id,
            "email": useEmail
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
            <TextBox Placeholder="Product Color" 
                     InitialText={formData.Color} 
                     Name="Color" 
                     function_event={HandleInputChange} 
                     Type="text"/>

            {/* <input type="text" value={formData.Color} placeholder="Color" name="Color" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div>  
        <div>
        <TextBox Placeholder="Product Size" 
                     InitialText={formData.Size} 
                     Name="Size" 
                     function_event={HandleInputChange} 
                     Type="text"/>
            {/* <input type="text" value={formData.Size} placeholder="Size" name="Size" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div> 
        <div>
        <TextBox Placeholder="Product Price" 
                     InitialText={formData.Price} 
                     Name="Price" 
                     function_event={HandleInputChange} 
                     Type="number"/>
            {/* <input type="number" value={formData.Price} placeholder="Price" name="Price" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div> 
        <div>
        <TextBox Placeholder="Product Stock" 
                     InitialText={formData.Stock} 
                     Name="Stock" 
                     function_event={HandleInputChange} 
                     Type="number"/>
            {/* <input type="number" value={formData.Stock} placeholder="Stock" name="Stock" autoComplete="new-password" onChange={HandleInputChange}required/> */}
        </div> 
        <div>
            <Select Selected={formData.Status} InitialText="Select Status" Name="Status" Data={CollapsibleStatus()} function_event={HandleInputChange}/>
        </div> 
        <div className='CKeditorContent'>
            <CKEditorComponent data={formData.Description===null?"Product Description":formData.Description} onChange={ckEditorInputChange}/>
        </div>
        <div>
            <input type='submit' value="Save"/>
        </div>  
    </form>
  )
}

export default EditForm