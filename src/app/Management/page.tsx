"use client"
import { Icon } from '@iconify/react';
import { GET_LOGIN } from 'graphql/queries';
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/navigation';
import client from 'client';
import { setSharedCookie, triggerCancel, triggerLogin } from 'utils/triggers';
interface JwtPayload {
  user: {
    jsonToken: string,
    statusText: string
  },
  exp: any
}

export default function Index() {
  return (
    <form onSubmit={triggerLogin}> {/* Form starts here */}
      <div className='Main'>
        <div className='LoginDivContainer'>
          <div className='LoginDiv'>
            <div className='LabelHead'>
              <Icon icon="entypo:login" /> Login
            </div>
            <div className='div'>
              <input
                type='email'
                placeholder='Input Email'
                id='username'
                className='usernameinput'
                autoComplete='off'
                defaultValue='Legitem2023@gmail.com'
                required
              />
            </div>
            <div className='div'>
              <input
                type='password'
                placeholder='Password'
                id='password'
                className='passwordinput'
                autoComplete='off'
                defaultValue='2ddyjrv15G6'
                required
              />
            </div>
            <div className='div'>
              <div className='ErrorHandling' id='ErrorHandling'>

              </div>
            </div>
            <div className='divButton'>
              <button type='button' onClick={triggerLogin}>Login</button> {/* Submit button */}
              <button type='button' onClick={triggerCancel}>Cancel</button> {/* Button type added */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
