import React, { useState } from 'react'
import CKEditorComponent from '../Management_ui/CKEditorComponent'
import Dcontent from './content/Dcontent';
import { setGlobalState, useGlobalState } from 'state';
import { useMutation } from '@apollo/client';
import { INSERT_DISCLAIMER } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import { Icon } from '@iconify/react';

const Disclaimer = () => {
    const [useCKEditor, setCKEditor] = useState(null);
    const Management = new DataManager();
    const [useDisclaimerData] = useGlobalState("setDisclaimerData");

    const [insertDisclaimer] = useMutation(INSERT_DISCLAIMER,{
      onCompleted: (e) => {
          console.log(e)
          if(e.insertDisclaimer.statusText === "Disclaimer Added Successfully"){
              Management.Success(e.insertDisclaimer.statusText);    
          }
          
      }
  })



    const ckEditorInputChange = (data) =>{
        const value = data;
        setGlobalState("setDisclaimerData",value);
     }

     const handleSubmit = () =>{
      insertDisclaimer({
        variables:{
          content:useDisclaimerData
        }
      })
     }

  return (
    <div className='PrivacyContainer'>
        <div>
            <CKEditorComponent  data={useDisclaimerData} onChange={ckEditorInputChange}/>
            <button onClick={handleSubmit} className='addNewItemButton'>
                <Icon icon="material-symbols:save" />
            </button>
        </div>
        <div>
          <Dcontent/>
        </div>
    </div>
  )
}

export default Disclaimer