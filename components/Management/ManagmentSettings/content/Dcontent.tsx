import React from 'react'
import { NEWS_MANAGEMENT, READ_DISCLAIMER } from 'graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import Loading from 'components/LoadingAnimation/Loading'
import { setGlobalState, useGlobalState } from 'state'
import HtmlRenderer from 'components/HTML/HtmlRenderer'
import { DELETE_DISCLAIMER } from 'graphql/Mutation'
import { Icon } from '@iconify/react'
import Pagination from '../../Management_universal_pagination/Pagination'
import { fallbackImage } from 'utils/extraFetch'
import Image from 'next/image'

const Dcontent = () => {
  const { data, loading, error,refetch } = useQuery(READ_DISCLAIMER);
  const path = process.env.NEXT_PUBLIC_PATH || '';

  const [deleteDisclaimer] = useMutation(DELETE_DISCLAIMER,{
    onCompleted:(e)=>{
      refetch();
    }
  })

  if (loading) return <Loading />;
  if (error) return error.message;


  const handleDelete = (e:any) =>{
    const conf = confirm("Are you sure you want to delete this item?");
    if(conf){
        deleteDisclaimer({variables:{deleteDisclaimerId:e}})
    }
  }

  return (
    <div className='newsTable'>
      {
        data?.readDisclaimer.map((item: any, idx: number) => (
          <div key={idx} className='newsTableBody'>
            <div className='ck'><Icon icon="eva:close-square-fill" 
              style={{color: '#ff0000',fontSize:'40px',cursor:'pointer'}} 
              onClick={() =>{handleDelete(item.id)}}/>

              <Icon icon="bx:edit" 
              style={{color: '#00ff00',fontSize:'40px',cursor:'pointer'}} 
              onClick={() =>{setGlobalState("setDisclaimerData",item.content)}}/>
            </div>
            <div><HtmlRenderer htmlContent={item.content} /></div>
          </div>
        ))
      }
    </div>
  );
};

export default Dcontent;
