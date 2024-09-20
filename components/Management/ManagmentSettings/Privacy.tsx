import React, { useState } from 'react'
import CKEditorComponent from '../Management_ui/CKEditorComponent'
import { useMutation } from '@apollo/client';
import { INSERT_PRIVACY } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import { Icon } from '@iconify/react';
import Pcontent from './content/Pcontent';
import { setGlobalState, useGlobalState } from 'state';

const Privacy = () => {
    const Management = new DataManager();
    const [usePrivacyData] = useGlobalState("setPrivacyData")

    const [insertPrivacy] = useMutation(INSERT_PRIVACY,{
        onCompleted: (e) => {
            console.log(e.insertPrivacy.statusText)
            if(e.insertPrivacy.statusText === "Successful!"){
                Management.Success(e.insertPrivacy.statusText);
            }
        }
    }
  )
    const ckEditorInputChange = (data) =>{
        const value = data;
        setGlobalState("setPrivacyData",value);
     }

     const handleInsert = () =>{
        insertPrivacy({
            variables:{
                content:usePrivacyData
            }
        })
     }

  return (
    <div className='PrivacyContainer'>
        <div>
            <CKEditorComponent  data={usePrivacyData} onChange={ckEditorInputChange}/>
            <button onClick={handleInsert} className='addNewItemButton'>
                <Icon icon="material-symbols:save" />
            </button>
        </div>
        <div>
            
            <Pcontent/>
        </div>
    </div>
  )
}

export default Privacy