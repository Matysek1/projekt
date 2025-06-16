import { useState, forwardRef, useImperativeHandle } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export type TextEditorHandle = {
  getValue: () => string;
};

const TextEditor = forwardRef<TextEditorHandle>((_, ref) => {
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={{ height: '300px' }}
      />
    </div>
  );
});

TextEditor.displayName = 'TextEditor';
export default TextEditor;