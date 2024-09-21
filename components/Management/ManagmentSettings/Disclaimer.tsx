import React, { useState } from 'react'
import CKEditorComponent from '../Management_ui/CKEditorComponent'
import Dcontent from './content/Dcontent';
import { setGlobalState, useGlobalState } from 'state';
import { useMutation, useQuery } from '@apollo/client';
import { INSERT_DISCLAIMER } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import { Icon } from '@iconify/react';
import { READ_DISCLAIMER } from 'graphql/queries';
import Loading from 'components/LoadingAnimation/Loading';

const Disclaimer = () => {

    const { data, loading, error,refetch:DisclaimerRefetch } = useQuery(READ_DISCLAIMER);
    const Management = new DataManager();
    const [useDisclaimerData] = useGlobalState("setDisclaimerData");

    const [insertDisclaimer] = useMutation(INSERT_DISCLAIMER,{
      onCompleted: (e) => {
          console.log(e)
          if(e.insertDisclaimer.statusText === "Disclaimer Added Successfully"){
              Management.Success(e.insertDisclaimer.statusText); 
              DisclaimerRefetch();   
          }
          
      }
  })

    const ckEditorInputChange = (data) =>{
        const value = data;
        setGlobalState("setDisclaimerData",value);
     }

     const handleSubmit = () =>{
      if(useDisclaimerData==="") return 
      insertDisclaimer({
        variables:{
          content:useDisclaimerData
        }
      })
     }
     if (loading) return <Loading/>;
     if (error) return "Connection Error";
  return (
    <div className='PrivacyContainer'>
        <div>
            <CKEditorComponent  data={useDisclaimerData} onChange={ckEditorInputChange}/>
          <div className='settings_mutation_container'>
            <button onClick={handleSubmit} className='addNewItemButton'>
                <Icon icon="ic:round-add-box" />
            </button>
            <button className='editNewItemButton' disabled>
                <Icon icon="material-symbols:save" />
            </button>
          </div>
        </div>
        <div>
          <Dcontent data={data} DisclaimerRefetch={DisclaimerRefetch}/>
        </div>
    </div>
  )
}

export default Disclaimer