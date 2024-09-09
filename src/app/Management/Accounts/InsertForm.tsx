import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react';
import TextBox from 'components/Management/Management_ui/TextBox';
import { INSERT_NEW_ENCODER } from 'graphql/Mutation';
import { GET_FILTERED_USERS } from 'graphql/queries';
import React, { useState } from 'react'
import { useGlobalState } from 'state';
import DataManager from 'utils/DataManager'

const InsertForm = () => {
    const Manager = new DataManager();
    const [useEmail] = useGlobalState("cookieEmailAddress");
    const [useLevel] = useGlobalState("cookieUserLevel");
    const [errors, setErrors]:any = useState();
    const [formData, setFormData] = useState({
      accountEmail: '',
      password: ''
    });
  
    const [inser_new_encoder] = useMutation(INSERT_NEW_ENCODER,{
        onCompleted: data => {
          if(data.insertUser.statusText==="This Email is already taken"){
            Manager.Warning(data.insertUser.statusText);
          }
          if(data.insertUser.statusText==="Successfully"){
            Manager.Success(data.insertUser.statusText);
          }
        }
      });


    const validateForm = () => {
        if (!formData.accountEmail.trim()){
          setErrors('Email Address is required'); 
          Manager.Error(errors);
          return false;
        } 
        if (!formData.password.trim()){ 
          setErrors('Password is required'); 
          Manager.Error(errors);
          return false;
        } 
        // Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.accountEmail)){
          setErrors('Invalid email format'); 
          Manager.Error(errors);
          return false;
        } 
        // Password strength validation
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordPattern.test(formData.password)){
          setErrors('Password must be at least 8 characters long and contain at least one letter and one number'); 
          Manager.Error(errors);
          return false;
        }
        // Clear errors if all validations pass
        setErrors('');
        return true;
      };
      
      const SubmitForm = (e:any) =>{
      e.preventDefault();
      if (!validateForm()) return;
      try {
        inser_new_encoder({
          variables: {
            "emailAddress": formData.accountEmail,
            "password": formData.password,
            "agentIdentity": useEmail,
          },
          refetchQueries: [{
            query: GET_FILTERED_USERS,
            variables: { emailAddress: useEmail, userLevel: useLevel }
          }]
        })
      } catch (error) {
        Manager.Error("Something went wrong on the server");
      }
      }
      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
  return (
    <form onSubmit={SubmitForm} className='UniversalFormFrame' autoComplete="off">
    <div className='UniversalHeader'><Icon icon="mdi:account"  /> Create</div>
    <div>
      <TextBox Placeholder={"Create Email Address"} 
               InitialText={""} 
               Name={"accountEmail"} 
               function_event={handleInputChange} 
               Type={"text"}/>
    </div>
    <div>
      <TextBox Placeholder={"Create Password"} 
               InitialText={""} 
               Name={"password"} 
               function_event={handleInputChange} 
               Type={"password"}/>
      {/* <input type='password' placeholder='Create Password' name='password' autoComplete="new-password" onChange={handleInputChange} required/> */}
    </div>
    <div><input type='submit' value='Submit'/></div>
</form>
  )
}

export default InsertForm