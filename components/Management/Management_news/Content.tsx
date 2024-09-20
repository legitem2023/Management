import React from 'react'
import { NEWS_MANAGEMENT } from 'graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import Loading from 'components/LoadingAnimation/Loading'
import { setGlobalState, useGlobalState } from 'state'
import HtmlRenderer from 'components/HTML/HtmlRenderer'
import { DELETE_NEWS } from 'graphql/Mutation'
import { Icon } from '@iconify/react'
import Pagination from '../Management_universal_pagination/Pagination'
import { fallbackImage } from 'utils/extraFetch'
import Image from 'next/image'

const Content = () => {
  const [useEmail] = useGlobalState("cookieEmailAddress");
  const { data, loading, error,refetch } = useQuery(NEWS_MANAGEMENT, { variables: { emailAddress: useEmail } });
  const path = process.env.NEXT_PUBLIC_PATH || '';

  const [useInitSlice] = useGlobalState("CurrentPage");
  const [ItemPerpage] = useGlobalState("ItemPerpage");

  const [deleteNews] = useMutation(DELETE_NEWS,{
    onCompleted:(e)=>{
      refetch();
    }
  })

  if (loading) return <Loading />;
  if (error) return error.message;

  let itemsPerPage:any = ItemPerpage;
  let currentPage = useInitSlice;

  const totalItems = data?.readNewsManagement.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setGlobalState('CurrentPage', page);
  };

  const paginatedProducts = data?.readNewsManagement.slice((currentPage - 1) * itemsPerPage,currentPage * itemsPerPage);

  const handleDelete = (e:any) =>{
    const conf = confirm("Are you sure you want to delete this item?");
    if(conf){
      deleteNews({variables:{param:e}})
    }
  }

  return (
    <div className='newsTable'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      {
        paginatedProducts.map((item: any, idx: number) => (
          <div key={idx} className='newsTableBody'>
            <div className='Menu_label_management'><Icon icon="fa6-solid:newspaper" />{item.title}</div>
            <div>
              <Image height="200" 
                      width="200" 
                      className='NewsTHUMBNAIL'
                      src={path+item.thumbnail}
                      onError={fallbackImage}
                      alt={item.id}
                   /></div>
            <div><HtmlRenderer htmlContent={item.summary} /></div>
            <div className='ck'><Icon icon="eva:close-square-fill" 
                  style={{color: '#ff0000',fontSize:'40px',cursor:'pointer'}} 
                  onClick={() =>{handleDelete(item.id)}}/>

                  <Icon icon="bx:edit" 
                  style={{color: '#00ff00',fontSize:'40px',cursor:'pointer'}} 
                  onClick={() =>{setGlobalState("setNewsData",item.summary)}}/>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Content;
