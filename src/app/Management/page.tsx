"use client"
import { Icon } from '@iconify/react';
import { READLOGIN } from 'graphql/Mutation';
import { useRouter } from 'next/navigation';
import { triggerCancel } from 'utils/triggers';
import { useMutation} from '@apollo/client';
import { useRef, useState } from 'react';
import Loading from 'components/LoadingAnimation/Loading';

export default function Index() {
  const username = useRef();
  const password = useRef();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setSharedCookie = (name: string, value: string, daysToExpire: any) => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + daysToExpire);
    const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(value) +
        '; expires=' + expiration.toUTCString() +
        '; secure;' +
        '; path=/';
    document.cookie = cookieValue;
}
  let [Login] = useMutation(READLOGIN, {
    onCompleted: data => {
      if(data.ReadLogin.statusText==='Welcome!'){
            setSharedCookie("token", data.ReadLogin.jsonToken, 1);
            setIsLoading(false);
            router.push('/Management/Dashboard/');
        } else {
            (document.getElementById("password") as HTMLInputElement).focus();        
      }
    },
    onError: () => {
      setIsLoading(false);
    },
})

   const triggerLogin = async (e: any) => {
    setIsLoading(true);
    const Inputusername:any = username.current;
    const Inputpassword:any = password.current;
    Login({
        variables: {
            "username": Inputusername.value,
            "password": Inputpassword.value
        }
      })
  };
  return (
    <form onSubmit={triggerLogin}> {/* Form starts here */}
      <div className='Main'>
        {isLoading && <Loading />}
        <div className='LoginDivContainer'>
          <div className='LoginDiv'>
            <div className='LabelHead'>
              <Icon icon="entypo:login" /> Login
            </div>
            <div className='div'>
              <input
                type='email'
                ref={username}
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
                ref={password}
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
              <button type='button' onClick={triggerLogin}>
              {isLoading?
              <Icon icon="eos-icons:loading" />:"Login"}
              </button> {/* Submit button */}
              <button type='button' onClick={triggerCancel}>Cancel</button> {/* Button type added */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
