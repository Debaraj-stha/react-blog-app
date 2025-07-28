import React, { memo, useEffect, useState } from 'react';
import { Editor, Transforms, type Descendant } from 'slate';
import { Slate, Editable } from 'slate-react';
import Toolbar from './Toolbar';
import { useCreateContext } from '../../Provider/CreatePostProvider';
import Input from '../Input';
import SaveToLocalStorage from '../../helper/autoSaveBlogToLocalstorage';
import { useAuth } from '../../Provider/AuthProvider';
import type { LocalStorageBlogType } from '../../types/localStorageBlogType';

type EditorFormProps = {
  initialValue: Descendant[];
  handleSubmit: (e: React.FormEvent) => void;
};

const EditorForm = memo(({ handleSubmit }: EditorFormProps) => {
  const { user } = useAuth();
  const {
    renderLeaf,
    renderElement,
    editor,
    setTitle,
    content,
    setContent,
    title,
    selectedTags,
    setSelectedTags,
    editors,
    setEditors,
  } = useCreateContext();


  

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
        <Input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </div>

      {/* Rich Text Editor */}
      <div className="max-h-[500px] overflow-auto border border-gray-300 rounded">
        <Slate editor={editor} initialValue={content} onChange={setContent}>
          <Toolbar />
          <div className="border border-gray-300 rounded min-h-[400px] p-2">
            <Editable
              placeholder="Start writing your post..."
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              className="min-h-[150px] focus:outline-none text-black"
            />
          </div>
        </Slate>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </form>
  );
});

export default EditorForm;
