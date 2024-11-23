import React, { useMemo, useState, KeyboardEvent, useEffect } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useRouter } from 'next/navigation';

type ParagraphElement = { type: 'paragraph'; children: { text: string }[] };

const DocumentPage = () => {
  const router = useRouter();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  // Initialize state with null first
  const [title, setTitle] = useState<string | null>(null);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  // Load data from localStorage after component mounts
  useEffect(() => {
    const savedTitle = localStorage.getItem('document-title');
    setTitle(savedTitle || 'Untitled Document');

    const savedContent = localStorage.getItem('document-content');
    if (savedContent) {
      setValue(JSON.parse(savedContent));
    }
  }, []);

  // Save title to localStorage when it changes
  useEffect(() => {
    if (title) {
      localStorage.setItem('document-title', title);
    }
  }, [title]);

  // Save content to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('document-content', JSON.stringify(value));
  }, [value]);

  const handleTitleEdit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  // Show loading state while title is null
  if (title === null) {
    return null; // or a loading spinner
  }

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
      
      <div className="max-w-[850px] h-[calc(100vh-8rem)] mx-auto bg-white rounded-2xl shadow-lg p-12 overflow-auto">
        <Slate 
          editor={editor} 
          initialValue={value} 
          onChange={newValue => setValue(newValue)}
        >
          <Editable
            className="outline-none h-full"
            placeholder="Start typing..."
          />
        </Slate>
      </div>
    </div>
  );
};

export default DocumentPage; 