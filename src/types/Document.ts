interface Document {
  id: string;
  title: string;
  content: any; // Slate.js content
  parentId: string | null;
  children: string[]; // Array of document IDs
  createdAt: Date;
  updatedAt: Date;
} 