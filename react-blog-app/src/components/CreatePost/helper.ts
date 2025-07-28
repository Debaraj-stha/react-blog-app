import { Editor, Transforms, Element as SlateElement, Path } from 'slate';
import type { BlockType, CustomElement, CustomText, ImageElement, ListType, ParagraphElement, VideoElement } from '../../types/slate';




/* Define a type for valid mark formats */
//It removes text: string, because text is not a format mark, it's the raw content.
export type MarkFormat = keyof Omit<CustomText, 'text'>;

/* ---------- Helpers for Marks ---------- */
export const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const setMark = (editor: Editor, key: string, value: any) => {
  if (!editor) return;
  Editor.addMark(editor, key, value);
};
/* ---------- Helpers for Blocks ---------- */
export const toggleBlock = (editor: Editor, format: BlockType) => {
  const isActive = isBlockActive(editor, format);
  const newType = isActive ? 'paragraph' : format;

  Transforms.setNodes<SlateElement>(
    editor,
    { type: newType },
    { match: n => SlateElement.isElement(n) && typeof n.type === 'string' }
  );
};


export const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );
  return !!match;
};





export const toggleList = (editor: Editor, listType: ListType) => {
  // Check if already active
  const isActive = isBlockActive(editor, listType);

  // Unwrap existing lists (bulleted, numbered, check, etc.)
  //It unwraps matching parent nodes in the selection, removing them and keeping their children.
  /**
   * before unwrap
    - list (type='bulleted-list')
    - item (type='list-item')
    - "My text"
    *after unwrap
    - item (type='list-item')
    - "My text"

   */
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && //not the root itself
      SlateElement.isElement(n) && //must be element not leaf
      ['bulleted-list', 'numbered-list', 'check-list', 'alphabetic-list', 'roman-list'].includes(n.type), //must be one of the given type
    //if the selection is inside part of a list, it will split the list.
    //Only the selected part is unwrapped.
    split: true,
  });

  // If active, turn back to paragraph
  if (isActive) {
    Transforms.setNodes(editor, { type: 'paragraph' });
    return;
  }

  // Otherwise, turn selection into list-item
  Transforms.setNodes(editor, { type: 'list-item' });

  // Wrap list-items in list container
  const listBlock = { type: listType, children: [] };
  Transforms.wrapNodes(editor, listBlock as CustomElement);
};


type MediaElementType = ImageElement | VideoElement
// Insert image or video and move selection after it

/**
 * Inserts a media block (image/video) into the Slate editor and appends an empty paragraph after it.
 * Ensures the editor has a valid selection before insertion and moves the cursor after the media block.
 */
export const insertMediaBlock = (editor: Editor, mediaElement: MediaElementType) => {
  const { selection } = editor;

  // If there's no selection (e.g., editor is not focused), move the selection to the end of the document
  if (!selection) {
    const endPoint = Editor.end(editor, []);
    Transforms.select(editor, endPoint);
  }

  // Insert the media element (image/video) at the current selection
  Transforms.insertNodes(editor, mediaElement);

  // Define an empty paragraph block to insert after the media block
  const paragraph: CustomElement = {
    type: "paragraph",
    children: [{ text: "" }],
  };

  // Try to find the media element we just inserted, so we know where it was added
  const insertedEntry = Editor.above(editor, {
    match: n => n === mediaElement,
    at: editor.selection!,
  });

  let nextPath: Path;

  if (insertedEntry) {
    // If the inserted media block is found, insert the paragraph directly after it
    const [_, path] = insertedEntry;
    nextPath = Path.next(path);
  } else {
    // If not found (fallback), append the paragraph at the end of the document
    nextPath = [Editor.node(editor, []).length];
  }

  // Insert the paragraph after the media block
  Transforms.insertNodes(editor, paragraph, { at: nextPath });

  // Move the cursor to the end of the newly inserted paragraph
  Transforms.select(editor, Editor.end(editor, nextPath));
};
