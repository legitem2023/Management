import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react'
import React from 'react'
import { setGlobalState, useGlobalState } from 'state';
import { INSERT_CATEGORY } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import Select from 'components/Management/Management_ui/Select';
const InsertFormCategory = ({CategoryRefetch}) => {

  const Manager = new DataManager();
  const [catFormDataAdd] = useGlobalState("categoryFormInsert");


  const [insertCategory] = useMutation(INSERT_CATEGORY,{
    onCompleted: data => {
        console.log(data);
        if(data.insertCategory.statusText==='Successful!'){
            Manager.Success(data.insertCategory.statusText);
            CategoryRefetch();
            return;
        }
    }
  })
 
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
    insertCategory({
        variables:{
            "categoryInput": {
              "Name": catFormDataAdd.Name,
              "icon": catFormDataAdd.icon,
              "image": catFormDataAdd.image,
              "status": catFormDataAdd.status
            }
        }
    })
}

const HandleInputChange = (e:any) =>{
    const { name, value } = e.target;
    setGlobalState("categoryFormInsert", (prevData) => ({
        ...prevData,
        [name]: value,
      }));
 }



  // Handle file input change
  const handleFileChange = (e) => {
    // const file = e.target.files[0]; // Get the first file
    const { name,files } = e.target;

    if (files) {
      const reader = new FileReader();
      
      // Convert file to base64 string when read
      reader.onloadend = () => {
        setGlobalState("categoryFormInsert", (prevData) => ({
            ...prevData,
            [name]: reader.result,
          }));

      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <form onSubmit={HandleSubmit}className='UniversalFormFrame'>
        <div className='UniversalHeader'>
            <Icon icon="mdi:account" /> Create Category
        </div>
        <div>
            <input type="text"  placeholder="Name" name="Name" autoComplete="new-password" onChange={HandleInputChange}required/>
        </div>  
        <div>
            <Select Selected={catFormDataAdd.status} InitialText="Select Status" Name="Status" Data={CollapsibleStatus()} function_event={HandleInputChange}/>
        </div> 
        <div>
            <input type="text"  placeholder="Icon" name="icon" autoComplete="new-password" onChange={HandleInputChange}required/>
        </div>  
        <div>
            <input type="file"  placeholder="Name" name="image" autoComplete="new-password" onChange={handleFileChange}required/>
        </div>  
        <div>
            <input type='submit' value="Add"/>
        </div>   

    </form>
  )
}

export default InsertFormCategory