import React, { useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

type ParagraphElement = { type: 'paragraph'; children: { text: string }[] };

const DocumentPage = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    } as ParagraphElement,
  ];

  const [value, setValue] = React.useState<Descendant[]>(initialValue);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="max-w-[850px] mx-auto mb-4">
        <h1 className="text-xl font-semibold text-gray-700">Untitled Document</h1>
      </header>
      
      <div className="max-w-[850px] min-h-[1100px] mx-auto bg-white rounded-2xl shadow-lg p-12">
        <Slate 
          editor={editor} 
          initialValue={initialValue} 
          onChange={newValue => setValue(newValue)}
        >
          <Editable
            className="outline-none min-h-full"
            placeholder="Start typing..."
          />
        </Slate>
      </div>
    </div>
  );
};

export default DocumentPage; 