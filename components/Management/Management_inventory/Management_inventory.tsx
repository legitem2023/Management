import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TimestampConverter from '../../../components/timestamp/TimestampConverter';
import Link from 'next/link';
import { setGlobalState } from 'state';
import Loading from 'components/LoadingAnimation/Loading';
import { useQuery } from '@apollo/client';
import { GET_CHILD_INVENTORY } from 'graphql/queries';

const Management_inventory = ({ setToggle, data }) => {
  const { data: ChildInventory, loading: ChildInventoryLoading,error } = useQuery(GET_CHILD_INVENTORY);
  const [loadingState, setLoadingState] = useState({});

  if (ChildInventoryLoading) return <Loading />;
  if(error) return error.toString();

  const handleLinkClick = (itemId) => {
    setLoadingState((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));
  };

  const ShowEdit = (data) => {
    setToggle(1);
    const setForm = {
      Id: data.id,
      Name: data.name,
      Category: data.category,
      ProductType: data.productType,
      Brandname: data.brandname,
      Status: data.status,
    };
    setGlobalState("invFormDataEdit", setForm);
  };

  const path = process.env.NEXT_PUBLIC_PATH;

  return data.length > 0 ? (
    data.map((item:any, idx:any) => (
      <div key={idx} className="InventoryBody">
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>ID </span>{item.id}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Name : </span>{item.name}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Category : </span>{item.category}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Product Type : </span>{item.productType}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Brandname : </span>{item.brandname}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}><span className='hideInDesktop'>Product Status : </span>{item.status}</div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
          <span className='hideInDesktop'>Created At : </span><TimestampConverter timestamp={item.dateCreated} />
        </div>
        <div className={'InventoryBodyCell InventoryBodyCell_det' + ' InventoryBodyCell' + item.id}>
        <span className='hideInDesktop'>Details </span><Link
            href={`${path}Management/Inventory/Details/?style=${item.styleCode}&Name=${item.name}&ProductType=${item.productType}&Category=${item.category}&Brand=${item.brandname}`}
            className="link"
            onClick={() => handleLinkClick(item.id)}>
            {loadingState[item.id] ? (
              <>
                Loading <Icon icon="eos-icons:loading" />
              </>
            ) : (
              `Details ${ChildInventory.getChildInventory.filter(
                (filtered:any) => filtered.style_Code === item.styleCode
              ).length}`
            )}
          </Link>

        </div>
        <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
        <span className='hideInDesktop'>Action </span>
          <Icon icon="bxs:edit" className="management_edit" onClick={() => ShowEdit(item)} />
          <Icon icon="material-symbols:delete-sharp" className="management_delete" />
          <Icon icon="carbon:view-filled" className="management_item" />
        </div>
        <div className="management_divider"></div>
      </div>
    ))
  ) : (
    <h1>No Data</h1>
  );
};

export default Management_inventory;
