import { create } from 'zustand';

interface DocumentStore {
  currentDocument: Document | null;
  documents: Document[];
  setCurrentDocument: (doc: Document) => void;
  createDocument: (parentId: string | null) => void;
  updateDocument: (id: string, content: any) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  currentDocument: null,
  documents: [],
  setCurrentDocument: (doc) => set({ currentDocument: doc }),
  createDocument: async (parentId) => {
    // Implementation for creating new document
  },
  updateDocument: async (id, content) => {
    // Implementation for updating document
  },
})); 