import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

/**
 * Define Text (Leaf) Node
 */
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  highlight?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  color?: string;
  backgroundColor?: string;
  fontSize?:string;
  fontFamily?:string
};

/**
 * For empty inline text
 */
export type EmptyText = {
  text: '';
};

/**
 * Paragraph block
 */
export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};
/**
 * Link
 */
export type LinkElement = {
  type: 'link';
  url: string;
  children: { text: string }[];
};

/**
 * Headings
 */
export type HeadingOneElement = {
  type: 'heading-one';
  children: CustomText[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
  children: CustomText[];
};

/**
 * Block Quote
 */
export type BlockQuoteElement = {
  type: 'block-quote';
  children: Descendant[];
};

/**
 * Code Block
 */
export type CodeBlockElement = {
  type: 'code-block';
  children: Descendant[];
};

/**
 * Image
 */
export type ImageElement = {
  type: 'image';
  url: string;
  alt?: string;
  public_id?:string;
  children: EmptyText[];
};

/**
 * Video
 */
export type VideoElement = {
  type: 'video';
  url: string;
  public_id?:string;
  filename?:string;
  children: EmptyText[];
};

/**
 * Horizontal Rule
 */
export type HorizontalRuleElement = {
  type: 'horizontal-rule';
  children: EmptyText[];
};

/**
 * Lists
 */
export type BulletedListElement = {
  type: 'bulleted-list';
  children: Descendant[];
};

export type NumberedListElement = {
  type: 'numbered-list';
  children: Descendant[];
};

export type CheckListElement = {
  type: 'check-list';
  checked: boolean;
  children: CustomText[];
};

export type AlphabeticListElement = {
  type: 'alphabetic-list';
  children: Descendant[];
};

export type RomanListElement = {
  type: 'roman-list';
  children: Descendant[];
};
export type ListItem={
  type:"list-item";
  children:Descendant[]
}

/**
 * Callout Block
 */
export type CalloutElement = {
  type: 'callout';
  children: Descendant[];
};

/**
 * Table Example 
 */
export type TableElement = {
  type: 'table';
  children: TableRowElement[];
};

export type TableRowElement = {
  type: 'table-row';
  children: TableCellElement[];
};

export type TableCellElement = {
  type: 'table-cell';
  children: Descendant[];
};

/**
 * Alignment
 */
export type AlignLeftElement = {
  type: 'align-left';
  children: Descendant[];
};

export type AlignCenterElement = {
  type: 'align-center';
  children: Descendant[];
};

export type AlignRightElement = {
  type: 'align-right';
  children: Descendant[];
};

export type JustifyElement = {
  type: 'justify';
  children: Descendant[];
};


//list types

export type ListType =
  | 'bulleted-list'
  | 'numbered-list'
  | 'check-list'
  | 'alphabetic-list'
  | 'roman-list';

/**
 * Define the union type for all elements in your editor
 */
export type CustomElement =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | BlockQuoteElement
  | CodeBlockElement
  | ImageElement
  | VideoElement
  | HorizontalRuleElement
  | BulletedListElement
  | NumberedListElement
  | CheckListElement
  | AlphabeticListElement
  | RomanListElement
  | CalloutElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | AlignLeftElement
  | AlignCenterElement
  |LinkElement
  | AlignRightElement
  |ListItem
  | JustifyElement;


  export type BlockType =
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'block-quote'
  | 'code-block'
  | 'image'
  | 'video'
  | 'horizontal-rule'
  | 'bulleted-list'
  | 'numbered-list'
  | 'check-list'
  | 'alphabetic-list'
  | 'roman-list'
  | 'callout'
  | 'table'
  | 'table-row'
  | 'table-cell'
  | 'align-left'
  | 'align-center'
  | 'align-right'
  |'link'
  |'list-item'
  | 'justify';

/**
 * Extend Slate types
 */

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

