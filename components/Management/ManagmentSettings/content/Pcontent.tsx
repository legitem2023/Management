import React from 'react'
import { NEWS_MANAGEMENT, READ_PRIVACY } from 'graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import Loading from 'components/LoadingAnimation/Loading'
import { setGlobalState, useGlobalState } from 'state'
import HtmlRenderer from 'components/HTML/HtmlRenderer'
import { DELETE_PRIVACY } from 'graphql/Mutation'
import { Icon } from '@iconify/react'
import Pagination from '../../Management_universal_pagination/Pagination'
import { fallbackImage } from 'utils/extraFetch'
import Image from 'next/image'

const Pcontent = ({ data, Privacyrefetch }: { data: any; Privacyrefetch: () => void }) => {
  const content = data?.readPrivacy || [];
  const path = process.env.NEXT_PUBLIC_PATH || '';

  const [deletePrivacy] = useMutation(DELETE_PRIVACY,{
    onCompleted:(e)=>{
      Privacyrefetch();
    }
  })


  const handleDelete = (e:any) =>{
    const conf = confirm("Are you sure you want to delete this item?");
    if(conf){
      deletePrivacy({variables:{deletePrivacyId:e}})
    }
  }

  return (
    <div className='newsTable'>
      {
        content.length > 0?
        content.map((item: any, idx: number) => (
          <div key={idx} className='newsTableBody'>
            <div className='ck'><Icon icon="eva:close-square-fill" 
              style={{color: '#ff0000',fontSize:'40px',cursor:'pointer'}} 
              onClick={() =>{handleDelete(item.id)}}/>

              <Icon icon="bx:edit" 
              style={{color: '#00ff00',fontSize:'40px',cursor:'pointer'}} 
              onClick={() =>{setGlobalState("setPrivacyData",item.content)}}/>
            </div>
            <div><HtmlRenderer htmlContent={item.content} /></div>
          </div>
        )):"No Data Found"
      }
    </div>
  );
};

export default Pcontent;
