import React, { useState } from 'react'
import CKEditorComponent from '../Management_ui/CKEditorComponent'
import Acontent from './content/Acontent';
import { setGlobalState, useGlobalState } from 'state';
import { useMutation, useQuery } from '@apollo/client';
import { INSERT_ABOUT } from 'graphql/Mutation';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { READ_ABOUT_US } from 'graphql/queries';
import Loading from 'components/LoadingAnimation/Loading';

const About = () => {
    const [useAbout] = useGlobalState("setAbout");
    const Management = new DataManager();

    const { data, loading, error, refetch:AboutRefetch } = useQuery(READ_ABOUT_US);



    const [insertAbout] = useMutation(INSERT_ABOUT,{
      onCompleted:(e) =>{
        console.log(e.insertAbout.statusText)
        if(e.insertAbout.statusText==='About Added Successfully'){
          Management.Success(e.insertAbout.statusText);
          AboutRefetch();
        }
      }
    });
    const ckEditorInputChange = (data) =>{
        const value = data;
        setGlobalState("setAbout",value);
     }

     const handleSubmit = () =>{
      if(useAbout==="") return
      insertAbout({
        variables:{
          content:useAbout
        }
      })
     }

  if (loading) return <Loading />;
  if (error) return "Connection Error";
    
  return (
    <div className='PrivacyContainer'>
        <div>
            <CKEditorComponent  data={useAbout} onChange={ckEditorInputChange}/>
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
          <Acontent data={data} AboutRefetch={AboutRefetch}/>
        </div>
    </div>
  )
}

export default About