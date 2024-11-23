import React, { useMemo, useState, KeyboardEvent } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

type ParagraphElement = { type: 'paragraph'; children: { text: string }[] };

const DocumentPage = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [title, setTitle] = useState('Untitled Document');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    } as ParagraphElement,
  ];

  const [value, setValue] = React.useState<Descendant[]>(initialValue);

  const handleTitleEdit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="max-w-[850px] mx-auto mb-4">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleTitleEdit}
            onBlur={() => setIsEditingTitle(false)}
            className="text-xl font-semibold text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
            autoFocus
          />
        ) : (
          <div className="group relative inline-block">
            <h1 
              className="text-xl font-semibold text-gray-700 cursor-pointer group-hover:text-gray-900"
              onClick={() => setIsEditingTitle(true)}
            >
              {title}
            </h1>
            <div className="hidden group-hover:block absolute -top-5 left-0 text-xs text-gray-500">
              Click to edit
            </div>
            <div className="hidden group-hover:block absolute bottom-0 left-0 right-0 h-px bg-gray-300" />
          </div>
        )}
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