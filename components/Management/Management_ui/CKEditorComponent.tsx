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
      apiKey='cwn0oh6tsk3swlt9qm1xpofcybpgg65bban9nsl3tdavcr12'
      init={{
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Oct 2, 2024:
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }}
      initialValue={data}
      onEditorChange={onChange}
    />
  );
};

export default CKEditorComponent;

