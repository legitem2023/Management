import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react'
// import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES, UPDATE_PARENT_INVENTORY } from 'graphql/queries';
import { UPDATE_CHILD_INVENTORY } from 'graphql/Mutation';
import React, { useState } from 'react'
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
const [editingRowId, setEditingRowId] = useState(null); // Track which row is being edited

  const [UpdateChildInventory] = useMutation(UPDATE_CHILD_INVENTORY, {
    onCompleted: data => {
        if(data.updateChildInventory.statusText==='Successfuly Save!'){
            Manager.Success(data.updateChildInventory.statusText);
            InventoryRefetch();
            setToggle(0);
            return;
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
      return;
 }
 const ckEditorInputChange = (data) =>{
    const value = data;
    setGlobalState("invFormDetailDataEdit", (prevData) => ({
        ...prevData,
        ["Description"]: value,
      }));
      return;
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
    return;
 }





  return (
    <form onSubmit={handleSubmit} className='UniversalFormFrame'>
       <div className='UniversalHeader'>
        <Icon icon="mdi:account" /> Modify
        </div>
        <div>
            <input type='text' placeholder='Product Color' name='Color' value={invFormDetailDataEdit.Color} onChange={HandleInputChange}/>
        </div>  
        <div>
            <input type='text' placeholder='Product Size' name='Size' value={invFormDetailDataEdit.Size} onChange={HandleInputChange}/>
        </div> 
        <div>
            <input type="number" placeholder='Product Price' name='Price' value={invFormDetailDataEdit.Price} onChange={HandleInputChange}/>
        </div> 
        <div>
            <input type="number" placeholder='Product Stock' name='Stock' value={invFormDetailDataEdit.Stock} onChange={HandleInputChange}/>
        </div> 
        <div>
            <Select Selected={invFormDetailDataEdit.Status} InitialText="Select Status" Name="Status" Data={CollapsibleStatus()} function_event={HandleInputChange}/>
        </div> 
        <div className='CKeditorContent'>
            <CKEditorComponent data={invFormDetailDataEdit.Description===null?"Product Description":invFormDetailDataEdit.Description} onChange={ckEditorInputChange}/>
        </div>
        <div>
            <input type='submit' value="Save"/>
        </div>  
    </form>
  )
}

export default EditForm