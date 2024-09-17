"use client"
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { useEffect, useState } from 'react';

// const CKEditorComponent = ({ data, onChange }) => {
//   const [editorLoaded, setEditorLoaded] = useState(false);

//   useEffect(() => {
//     setEditorLoaded(true);
//   }, []);

//   return (
//     <div>
//       {editorLoaded ? (
//         <CKEditor
//           editor={ClassicEditor}
//           data={data}
//           onChange={(event:any, editor:any) => {
//             const data = editor.getData();
//             onChange(data);
//           }}/>) : (
//         <p>Editor loading...</p>
//       )}
//     </div>
//   );
// };

// export default CKEditorComponent;

import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const CKEditorComponent = ({ data, onChange }) => {
  return (
    <Editor
      initialValue={data}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={onChange}
    />
  );
};

export default CKEditorComponent;

