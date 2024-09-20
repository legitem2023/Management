import React, { useState } from 'react'
import CKEditorComponent from '../Management_ui/CKEditorComponent'

const About = () => {
    const [useCKEditor, setCKEditor] = useState(null);

    const ckEditorInputChange = (data) =>{
        const value = data;
        setCKEditor(value);
     }

  return (
    <div className='PrivacyContainer'>
        <div>
            <CKEditorComponent  data={""} onChange={ckEditorInputChange}/>
        </div>
        <div></div>
    </div>
  )
}

export default About