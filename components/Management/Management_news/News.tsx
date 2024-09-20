import React, { useState } from 'react'
import { INSERT_NEWS } from 'graphql/Mutation'
import { useMutation } from '@apollo/client'
import CKEditorComponent from '../Management_ui/CKEditorComponent'
import Content from './Content'
import { useGlobalState } from 'state'
import TextBox from '../Management_ui/TextBox'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import DataManager from 'utils/DataManager'
const News = () => {
    const [useCKEditor, setCKEditor] = useState(null);
    const [useEmail] = useGlobalState("cookieEmailAddress");
    const [useNewsData] = useGlobalState("setNewsData")
    const path = process.env.NEXT_PUBLIC_PATH || '';
    const Management = new DataManager();
    const [insertNews] = useMutation(INSERT_NEWS,{
        onCompleted: (e) => {
            // console.log(e.insertNews.statusText)
            if(e.insertNews.statusText === "Successful!"){
                Management.Success(e);    
            }
            
        }
    })

    const ckEditorInputChange = (data) =>{
        const value = data;
        setCKEditor(value);
     }

     const handleSubmit = () =>{
        insertNews({
            variables: {
                "newsInput": {
                  "postedBy": useEmail,
                  "summary": useCKEditor,
                  "thumbnail": "Thumnail.png",
                  "title": "News"
                }
              }
        })
     }

  return (
    <div className='NewsInput'>
        <div>
        <TextBox Placeholder={"Title"} InitialText={""} Name={"Title"} function_event={()=>{}} Type={"text"}/>
        <Image className='NewsTHUMBNAIL' src={path + "Thumnail.png"} height='200' width='200' alt="1"/>
        <TextBox Placeholder={"Image"} InitialText={""} Name={"Image"} function_event={()=>{}} Type={"file"}/>
            <CKEditorComponent  data={useNewsData} onChange={ckEditorInputChange}/>
            <button onClick={handleSubmit} className='addNewItemButton'>
                <Icon icon="material-symbols:save" />
            </button>
            
        </div>
        <div>
            <Content/>
        </div>
        
    </div>
  )
}

export default News