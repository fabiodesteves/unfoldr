import React, { useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

interface EditorProps {
  initialContent: any;
  onChange: (value: any) => void;
}

const Editor = ({ initialContent, onChange }: EditorProps) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'heading-one':
        return (
          <h1 {...attributes} className="cursor-pointer hover:bg-gray-100">
            {children}
          </h1>
        );
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  return (
    <Slate editor={editor} initialValue={initialContent} onChange={onChange}>
      <Editable
        className="min-h-screen p-4 max-w-4xl mx-auto"
        renderElement={renderElement}
        placeholder="Start writing..."
      />
    </Slate>
  );
};

export default Editor; 