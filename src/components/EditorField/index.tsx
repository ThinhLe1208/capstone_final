import { Editor } from '@tinymce/tinymce-react';

import { TINY_KEY } from 'utils/constants';
import styles from './styles.module.scss';

type Props = {
  label?: string;
  name: string;
  height: number;
  value: string | undefined;
  setFieldValue: any; // formik handler
};

const EditorField = ({ label, name, height = 200, value, setFieldValue }: Props) => {
  return (
    <div className={styles.editorFieldWrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>
      <Editor
        id={name}
        apiKey={TINY_KEY}
        value={value}
        onEditorChange={(value: string) => setFieldValue(name, value)}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: Inter,Helvetica,Arial,sans-serif ; font-size:14px }',
        }}
      />
    </div>
  );
};

export default EditorField;
