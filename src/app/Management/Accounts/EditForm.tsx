import { Icon } from '@iconify/react';
import React from 'react';
import Accordion from 'components/Accordion/Accordion';
import { useMutation } from '@apollo/client';
import { UPDATE_ACCOUNT_DETAILS } from 'graphql/Mutation';
import DataManager from 'utils/DataManager';
import { setGlobalState, useGlobalState } from 'state';

const EditForm: React.FC = () => {
  const Manager = new DataManager();
  const [updateAccountDetails] = useMutation(UPDATE_ACCOUNT_DETAILS, {
    onCompleted: (data) => {
      console.log(data);
      if (data.updateAccountDetails.statusText === 'Success') {
        Manager.Success(data.updateAccountDetails.statusText);
      }else{
        Manager.Error(data.updateAccountDetails.statusText);
      }
    },
  });

  const [formDataEdit] = useGlobalState('accountFormDataEdit');

  // Get the first item in accountFormDataEdit (adjust if you need to handle multiple accounts)
  const data = formDataEdit || {
    accountLevel: '',
    Address: '',
    accountEmail: '',
    contactNo: '',
    fullname: '',
    loginAttemp: '',
    macAddress: '',
    agentIdentity: '',
    nameOfStore: '',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update only the specific field
    setGlobalState("accountFormDataEdit", (prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);
    updateAccountDetails({
      variables: {
        updateAccountDetailsInput: {
          accountLevel: data.accountLevel,
          agentIdentity: data.agentIdentity,
          email: data.accountEmail,
          loginAttemp: data.loginAttemp,
          macAddress: data.macAddress,
          nameOfStore: data.nameOfStore,
          accountDetails: {
            Address: data.Address,
            accountEmail: data.accountEmail,
            contactNo: data.contactNo,
            fullname: data.fullname,
            storeName: data.nameOfStore,
          },
        },
      },
    });
  };

  return (
    <form onSubmit={handleSave} className="UniversalFormFrame" autoComplete="off">
      <div className="UniversalHeader">
        <Icon icon="mdi:account" /> Modify
      </div>
      <div >
        {formDataEdit.accountEmail}
      </div>
      <div >
        <select name="accountLevel" value={formDataEdit.accountLevel} onChange={handleInputChange}>
          <option value="">Select Level</option>
          <option value="Merchant">Merchant</option>
          <option value="Sales">Sales</option>
          <option value="Encoder">Encoder</option>
        </select>
      </div>
      <div >
        <input
          type="text"
          placeholder="Fullname"
          name="fullname"
          defaultValue={formDataEdit.fullname || ''}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />
      </div>
      <div >
        <input
          type="text"
          placeholder="Address"
          name="Address"
          defaultValue={formDataEdit.Address}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />
      </div>
      <div >
        <input
          type="number"
          placeholder="Contact Number"
          name="contactNo"
          defaultValue={formDataEdit.contactNo || ''}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />
      </div>
      <div >
        <input
          type="text"
          placeholder="Name of Store"
          name="nameOfStore"
          defaultValue={formDataEdit.nameOfStore}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />
      </div>
      <div >
        <input
          type="text"
          placeholder="Mac Address"
          name="macAddress"
          defaultValue={formDataEdit.macAddress}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />
      </div>
      <div >
        <input
          type="text"
          placeholder="Agent"
          name="agentIdentity"
          defaultValue={formDataEdit.agentIdentity}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />
      </div>
      <div >
        <input
          type="number"
          placeholder="Login Attempt"
          name="loginAttemp"
          defaultValue={formDataEdit.loginAttemp || ''}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />
      </div>
      <div >
        <input type="submit" value="Save" />
      </div>
      <div className="UniversalHeader">
        <Icon icon="weui:location-filled" />
        <span>Select Address</span>
      </div>
      {/* <Accordion faqs={formDataEdit[0]?.accountDetails} /> */}
    </form>
  );
};

export default EditForm;
