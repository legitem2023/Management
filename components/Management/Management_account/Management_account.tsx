import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import Loading from 'components/LoadingAnimation/Loading';
import TimestampConverter from 'components/timestamp/TimestampConverter';
import { GET_FILTERED_USERS, GET_ACCOUNTS,GET_CHILD_INVENTORY } from 'graphql/queries';
import Link from 'next/link';
import React from 'react';
import { setGlobalState, useGlobalState } from 'state';
import { createdPath } from 'utils/triggers';
import StatisticsPagination from '../ManagementStatistics/StatisticsPagination';

interface AccountListType {
  accountList: Array<{
    email: string;
    accountLevel: string;
    nameOfStore: string;
    dateCreated: string;
    dateUpdated: string;
    macAddress: string;
    loginAttemp: number;
    status: string;
    accountDetails: string;
  }>,
  EditForm:any
}

const Management_account: React.FC<AccountListType> = ({ accountList,EditForm }) => {
  const [activate, setActivation] = React.useState<boolean>(false);
  const [useID, setID] = React.useState<number | null>(null);
  const [useInitSlice] = useGlobalState("setInitSlice");


  const path = process.env.NEXT_PUBLIC_PATH;
  const limitText = (text: string) => text.slice(0, 10) + (text.length > 10 ? "..." : "");
  const activateEdit = (e:any) => {
    EditForm();
    const accountFormDataEdit ={
            accountLevel: e.accountLevel,
            Address: e.accountDetails.filter((item)=>item.defaultAddress===true)[0]?.Address,
            accountEmail: e.email,
            contactNo: e.accountDetails.filter((item)=>item.defaultAddress===true)[0]?.contactNo,
            fullname: e.accountDetails.filter((item)=>item.defaultAddress===true)[0]?.fullname,
            loginAttemp: e.loginAttemp,
            macAddress: e.macAddress,
            agentIdentity: e.agentIdentity,
            nameOfStore: e.nameOfStore,
        }
    setGlobalState("accountFormDataEdit",accountFormDataEdit);
  };

  const AccountLevel = (defaultval: string, index: number) => (
    <select defaultValue={defaultval} id={"Ptype" + index}>
      <option value='Merchant'>Merchant</option>
      <option value='Sales'>Sales</option>
    </select>
  );

  const itemsPerPage = 10;
  const currentPage = useInitSlice;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  
  const totalItems = accountList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      {accountList.slice(startIndex, endIndex).map((item, idx:any) => (
        <div key={idx} className='AccountTable_body'>
          <div className='AccountTableCell'></div>
          <div className='AccountTableCell'>
          <span className="hideInDesktop">Email Address </span>{item.email}
          </div>
          <div className='AccountTableCell'>
          <span className="hideInDesktop">Name of Store </span>{item.nameOfStore}
          </div>
          <div className='AccountTableCell'>
          <span className="hideInDesktop">User Level </span>{activate && useID === idx ? AccountLevel(item.accountLevel, idx) : item.accountLevel || "Select Level..."}
          </div>
          <div className='AccountTableCell'>
          <span className="hideInDesktop">Date Created </span><TimestampConverter timestamp={item.dateCreated} />
          </div>
          <div className='AccountTableCell'>
          <span className="hideInDesktop">Date Updated </span><TimestampConverter timestamp={item.dateUpdated} />
          </div>
          <div className='AccountTableCell'>
          <span className="hideInDesktop">Mac Address </span>
            {activate && useID === idx ? (
              <input type='text' defaultValue={item.macAddress} placeholder="Mac Address..." id={'AccMacAdd' + idx} />
            ) : (
              item.macAddress || "Mac Address..."
            )}
          </div>
          {/* <div className='AccountTableCell AccountTableCell_det'>
            <Link className='details_link' href={path + "Management/Accounts/AccountDetails/" + createdPath(item.accountDetails)}>
              Details()
            </Link>
          </div> */}
          <div className='AccountTableCell'>
          <label>
              <input type="checkbox" id={"edit" + idx} className='hidden' aria-current={idx.toString()} onClick={()=>{activateEdit(item)}}/>
              <Icon icon="bxs:edit" className='management_edit' />
          </label>
            <Icon icon="material-symbols:delete-sharp" className='management_delete' />
            <Icon icon="carbon:view-filled" />
          </div>
        </div>
      ))}
      <StatisticsPagination InitSlice={useInitSlice} Pages={totalPages} />
    </div>
  );
};

export default Management_account;
