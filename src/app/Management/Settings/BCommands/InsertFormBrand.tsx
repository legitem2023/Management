import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react'
import React from 'react'
import { setGlobalState, useGlobalState } from 'state';
import { INSERT_BRAND} from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
const InsertFormBrand = ({BrandRefetch}) => {

  const Manager = new DataManager();
  const [brandFormInsert] = useGlobalState("brandFormInsert");

  const [InsertBrand] = useMutation(INSERT_BRAND,{
    onCompleted: data => {
        if(data.insertBrand.statusText==='Successful'){
            Manager.Success(data.insertBrand.statusText);
            BrandRefetch();
            return;
        }
    }
  })
 

const HandleSubmit = (e:any) =>{
    e.preventDefault();
    InsertBrand({
        variables:{
            "brandnameInput": {
              "Name": brandFormInsert.Name,
              "ProductType": brandFormInsert.ProductType
            }
          }
    })
}

const HandleInputChange = (e:any) =>{
    const { name, value } = e.target;
    setGlobalState("brandFormInsert", (prevData) => ({
        ...prevData,
        [name]: value,
      }));
 }

 console.log(brandFormInsert)

  return (
    <form onSubmit={HandleSubmit}className='UniversalFormFrame'>
        <div className='UniversalHeader'>
            <Icon icon="mdi:account" /> Create Brandname
        </div>
        <div>
            <input type="text" value={brandFormInsert.ProductType} placeholder="ProductType" name="ProductType" autoComplete="new-password" disabled={true} onChange={HandleInputChange}required/>
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

export default InsertFormBrand