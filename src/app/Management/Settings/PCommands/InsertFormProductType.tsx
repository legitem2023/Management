import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react'
import React from 'react'
import { setGlobalState, useGlobalState } from 'state';
import { INSERT_PRODUCT_TYPE } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
const InsertFormProductType = ({Product_TypeRefetch}) => {

  const Manager = new DataManager();
  const [ptypeFormDataAdd] = useGlobalState("productTypeFormInsert");

  const [InsertProductType] = useMutation(INSERT_PRODUCT_TYPE,{
    onCompleted: data => {
        if(data.insertProductTypes.statusText==='Successful'){
            Manager.Success(data.insertProductTypes.statusText);
            Product_TypeRefetch();
            return;
        }
    }
  })
 

const HandleSubmit = (e:any) =>{
    e.preventDefault();
    InsertProductType({
        variables:{
          "productTypesInput": {
            "Category": ptypeFormDataAdd.Category,
            "Name": ptypeFormDataAdd.Name
          }
        }
    })
}

const HandleInputChange = (e:any) =>{
    const { name, value } = e.target;
    setGlobalState("productTypeFormInsert", (prevData) => ({
        ...prevData,
        [name]: value,
      }));
 }

  return (
    <form onSubmit={HandleSubmit}className='UniversalFormFrame'>
        <div className='UniversalHeader'>
            <Icon icon="mdi:account" /> Create Product Type
        </div>
        <div>
            <input type="text" value={ptypeFormDataAdd.Category} placeholder="Category" name="Category" autoComplete="new-password" disabled={true} onChange={HandleInputChange}required/>
        </div>  
        <div>
        <input type="text" placeholder="Name" name="Name" autoComplete="new-password" onChange={HandleInputChange}required/>
        </div> 

        <div>
            <input type='submit' value="Add"/>
        </div>   
        {/* <ToastContainer></ToastContainer>   */}
    </form>
  )
}

export default InsertFormProductType