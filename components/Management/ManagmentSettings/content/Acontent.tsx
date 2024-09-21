import React from 'react';
import { READ_ABOUT_US } from 'graphql/queries';
import { useMutation } from '@apollo/client';
import Loading from 'components/LoadingAnimation/Loading';
import { setGlobalState } from 'state';
import HtmlRenderer from 'components/HTML/HtmlRenderer';
import { DELETE_ABOUT_US } from 'graphql/Mutation';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const Acontent = ({ data, AboutRefetch }: { data: any; AboutRefetch: () => void }) => {
  const content = data?.readAbout || [];
  const path = process.env.NEXT_PUBLIC_PATH || '';

  const [deleteAbout] = useMutation(DELETE_ABOUT_US, {
    onCompleted: () => {
      AboutRefetch();
    },
  });

  const handleDelete = (id: any) => {
    const conf = confirm('Are you sure you want to delete this item?');
    if (conf) {
      deleteAbout({ variables: { deleteAboutId: id } });
    }
  };

  if (!content.length) {
    return <div>No data found</div>;
  }

  return (
    <div className='newsTable'>
      {content.map((item: any, idx: number) => (
        <div key={idx} className='newsTableBody'>
          <div className='ck'>
            <Icon
              icon='eva:close-square-fill'
              style={{ color: '#ff0000', fontSize: '40px', cursor: 'pointer' }}
              onClick={() => handleDelete(item.id)}
            />
            <Icon
              icon='bx:edit'
              style={{ color: '#00ff00', fontSize: '40px', cursor: 'pointer' }}
              onClick={() => setGlobalState('setAbout', item.content)}
            />
          </div>
          <div>
            <HtmlRenderer htmlContent={item.content} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Acontent;
