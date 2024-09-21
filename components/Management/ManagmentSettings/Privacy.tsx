import React, { useState } from 'react'
import CKEditorComponent from '../Management_ui/CKEditorComponent'
import { useMutation, useQuery } from '@apollo/client';
import { INSERT_PRIVACY } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import { Icon } from '@iconify/react';
import Pcontent from './content/Pcontent';
import { setGlobalState, useGlobalState } from 'state';
import { READ_PRIVACY } from 'graphql/queries';
import Loading from 'components/LoadingAnimation/Loading';

const Privacy = () => {

    const { data, loading, error,refetch:Privacyrefetch } = useQuery(READ_PRIVACY);


    const Management = new DataManager();
    const [usePrivacyData] = useGlobalState("setPrivacyData")

    const [insertPrivacy] = useMutation(INSERT_PRIVACY,{
        onCompleted: (e) => {
            if(e.insertPrivacy.statusText === "Privacy Policy Added Successfully"){
                Management.Success(e.insertPrivacy.statusText);
                Privacyrefetch();
            }
        }
    }
  )
    const ckEditorInputChange = (data) =>{
        const value = data;
        setGlobalState("setPrivacyData",value);
     }

     const handleInsert = () =>{
        if(usePrivacyData==="") return 

        insertPrivacy({
            variables:{
                content:usePrivacyData
            }
        })
     }
     if (loading) return <Loading/>;
     if (error) return "Connection Error"
  return (
    <div className='PrivacyContainer'>
        <div>
            <CKEditorComponent  data={usePrivacyData} onChange={ckEditorInputChange}/>

        <div className='settings_mutation_container'>
            <button onClick={handleInsert} className='addNewItemButton'>
                <Icon icon="ic:round-add-box" />
            </button>
            <button className='editNewItemButton' disabled>
                <Icon icon="material-symbols:save" />
            </button>
        </div>
        </div>
        <div>
            <Pcontent data={data} Privacyrefetch={Privacyrefetch}/>
        </div>
    </div>
  )
}

export default Privacy