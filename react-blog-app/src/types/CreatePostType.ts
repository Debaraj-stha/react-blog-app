import type React from "react";
import type { JSX } from "react";
import type { Descendant, Editor } from "slate"
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import type { BlogType } from "./blog";

export type BlogStatusType = {
    isPublished: boolean,
    isScheduled: boolean,
    isUnpublish: boolean,
    scheduledAt?: Date | undefined
}
export type BlogStatusAction =
    { type: "SET_PUBLISH", payload: BlogStatusType } |
    { type: "SET_SCHEDULED", payload: BlogStatusType } |
    { type: "SET_UNPUBLISH", payload: BlogStatusType } |
    { type: 'SET_SCHEDULED_DATE', payload: BlogStatusType } |
    { type: "RESET", payload: BlogStatusType }
export type HandleChangeType = "SET_PUBLISH" | "SET_UNPUBLISH" | "SET_SCHEDULED" | 'SET_SCHEDULED_DATE'

export type CreatePostType = {
    editor: Editor;
    increaseDecreaseFont: (action: string) => void;
    insertImage: (url: string, alt?: string) => void;
    pickImage: (isMultiple?: boolean) => void;
    insertVideo: (url: string) => void;
    pickVideo: () => void;
    insertURL: () => void;
    insertHorizontalLine: () => void;
    insertTable: () => void;
    isEmojiPickerOpen: boolean;
    showEmojiPicker: () => void;
    closeEmojiPicker: () => void;
    emojiPickerEditor: Editor | null;
    showColorPicker: (isBackground: boolean) => void,
    closeColorPicker: () => void,
    isColorPickerOpen: boolean;
    colorPickerEditor: Editor | null;
    insertEmoji: (emoji: string) => void;
    pickColor: (color: any, isBackground?: boolean) => void;
    selectedBackgroundColor: string;
    selectedTextColor: string;
    isBackgroundColorPicked: boolean;
    renderLeaf: (props: RenderLeafProps) => JSX.Element;
    renderElement: (props: RenderElementProps) => JSX.Element;
    openCloseSpecialSymbolPicker: () => void;
    isSpecialSymbolPickerOpen: boolean;
    insertSymbol: (symbol: string) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    content: Descendant[];
    setContent: React.Dispatch<React.SetStateAction<Descendant[]>>;
    handleRemoveImage: (element: any) => void;
    initialValue: any
    step: number;
    selectedCategory: string | null;
    selectedTags: string[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    blogItToEdit: string | undefined
    setBlogIdToEdit: React.Dispatch<React.SetStateAction<string | undefined>>;
    editors: EditorType[] | undefined
    setEditors: React.Dispatch<React.SetStateAction<EditorType[] | undefined>>;
    blog: BlogType | undefined
    setBlog: React.Dispatch<React.SetStateAction<BlogType | undefined>>;
    statusState: BlogStatusType
    statusDispatch: React.Dispatch<BlogStatusAction>
    handleStatusChange: (type: HandleChangeType, scheduledAt?: Date | undefined) => void

};


export type EditorType = {
    name: string,
    _id: string,
    profile?: string
}