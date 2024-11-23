import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[850px] mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Welcome to the Document Editor</h1>
        
        <Link 
          href="/doc1" 
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Document
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 