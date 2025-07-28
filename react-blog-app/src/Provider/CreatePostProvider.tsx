import { createContext, useCallback, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import type { BlogStatusType, CreatePostType, EditorType, HandleChangeType } from "../types/CreatePostType";
import { Editor, Transforms } from "slate";
import type { CustomText, HorizontalRuleElement, ImageElement, LinkElement, TableCellElement, TableElement, TableRowElement, VideoElement } from "../types/slate";
import { createEditor } from "slate";
import { ReactEditor, withReact, type RenderElementProps, type RenderLeafProps } from "slate-react";
import { insertMediaBlock, setMark } from "../components/CreatePost/helper";
import { withHistory } from "slate-history";
import type { Descendant } from "slate";
import { uploadMultipleFiles } from "../helper/cloudinary-helper";


import RenderImageElement from "../components/CreatePost/RenderImageElement";
import apiHelper from "../helper/api-helper";
import RenderCodeBlock from "../components/RenderElements/RenderCodeBlock";
import RenderVideoElement from "../components/RenderElements/RenderVideoElement";
import { useMessageContext } from "./MessageProviders";
import { BASE_URL } from "../constraints";
import type { BlogType } from "../types/blog";
import blogStatusReducer from "../helper/reducers/blogStatusReducer";

type CreateContextProviderProps = {
    children: ReactNode
}

export const CreatePostContext = createContext<CreatePostType | null>(null)
const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'Write your amazing post here...' }],
    } as any
];
const iitialValue: BlogStatusType = {
    isPublished: false,
    isScheduled: false,
    isUnpublish: false,
    scheduledAt: undefined
}

const CreatePostProvider = ({ children }: CreateContextProviderProps) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [emojiPickerEditor, setEmojiPickerEditor] = useState<Editor | null>(null);
    const [isColorPickerOpen, setColorPickerOpen] = useState(false)
    const [colorPickerEditor, setColorPickerEditor] = useState<Editor | null>(null)
    const [selectedTextColor, setSelectedTextColor] = useState('black')
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('white')
    const [isBackgroundColorPicked, setBackgroundColorPicked] = useState(false)
    const [isSpecialSymbolPickerOpen, setSpecialSymbolPickerOpen] = useState(false)
    const [title, setTitle] = useState('');
    const [step, setStep] = useState(0); // 0 = Editor, 1 = Category, 2 = Tags
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [content, setContent] = useState<Descendant[]>(initialValue);
    const [blogItToEdit, setBlogIdToEdit] = useState<string | undefined>(undefined)
    const [editors, setEditors] = useState<EditorType[] | undefined>(undefined)
    const [blog, setBlog] = useState<BlogType | undefined>(undefined)
    const { addMessage } = useMessageContext()
    const [statusState, statusDispatch] = useReducer(blogStatusReducer, iitialValue)

    /**
     * Increase and decrease the font size
     * @param action  -specifies whether to increase or decrease,increase to increase and decrease to decrease 
     */
    const increaseDecreaseFont = useCallback((action: string) => {
        const select = document.getElementsByName("font-size")[0] as HTMLSelectElement;
        let currentSize = parseInt(select?.value || '14', 10);

        if (action === 'increase' && currentSize < 48) {
            currentSize += 2;
        } else if (action === 'decrease' && currentSize > 10) {
            currentSize -= 2;
        }

        if (select) {
            select.value = currentSize.toString();
        }

        // Apply the new size as a mark to the editor
        setMark(editor, "fontSize", `${currentSize}px`);
    }, [editor]);



    const insertImage = useCallback((url: string, alt?: string, public_id?: string) => {
        try {
            const image: ImageElement = {
                type: 'image',
                url: url,
                alt: alt,
                public_id: public_id,
                children: [{ text: "" }]
            }
            insertMediaBlock(editor, image)
        } catch (error: any) {
            addMessage({ message: `Error while inserting image,${error.message}`, type: "error" })

        }
    }, [])
    /**
     * create file input ,allow user to pick file and insert
     */
    const pickImage = useCallback(
        (pickMultiple?: boolean) => {
            try {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.multiple = !!pickMultiple;

                input.onchange = async (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (!files) return;
                    const fileList = Array.from(files)
                    const uploaded = await uploadMultipleFiles(fileList, 'image', (url, filename, publicId) => {
                        insertImage(url, filename, publicId); // or use `publicId` if needed
                    });
                    console.log(uploaded)
                };

                input.click();
            } catch (error: any) {
                addMessage({ message: `Error while inserting image,${error.message}`, type: "error" })

            }
        },
        [insertImage, editor]
    );

    /**
     * insert video element to node list
     */
    const insertVideo = useCallback((url: string, filename?: string, public_id?: string) => {
        try {
            const video: VideoElement = {
                type: "video",
                url: url,
                filename: filename,
                public_id: public_id,
                children: [{ text: "" }]
            }
            Transforms.insertNodes(editor, video)
        } catch (error: any) {
            addMessage({ message: `Error while inserting image,${error.message}`, type: "error" })

        }
    }, [editor])

    /**
     * Crate input tag allow user pick video file and inset
     */
    const pickVideo = useCallback(async () => {
        try {
            const input = document.createElement("input")
            input.type = "file"
            input.accept = "video/mp4"
            input.onchange = async (e) => {
                const files = (e.target as HTMLInputElement).files
                if (!files) return
                const fileList = Array.from(files)
                await uploadMultipleFiles(fileList, 'video', (url, filename, publicId) => {
                    insertVideo(url, filename, publicId); // or use `publicId` if needed
                });
            }
            input.click()
        } catch (error: any) {
            addMessage({ message: `Error while inserting image,${error.message}`, type: "error" })

        }
    }, [insertVideo, editor])
    /**
        * enter url link and text of url from prompt 
        */
    const insertURL = useCallback(() => {
        try {
            const url = prompt('Enter URL here...',)
            if (!url) return
            const text = prompt("Enter text here...", url) || url
            const linkNode: LinkElement = {
                url: url,
                type: "link",
                children: [{ text: text }]
            }
            Transforms.insertNodes(editor, linkNode)
        } catch (error: any) {
            addMessage({ message: `Error while inserting image,${error.message}`, type: "error" })

        }
    }, [editor])

    /**
     * insert horizontal line
     */
    const insertHorizontalLine = useCallback(() => {
        try {
            const horizontalRule: HorizontalRuleElement = {
                type: "horizontal-rule",
                children: [{ text: "" }]
            }
            Transforms.insertNodes(editor, horizontalRule)
        } catch (error: any) {
            alert(`Error while inserting horizontal line,${error.message}`)
        }
    }, [editor])

    /**
     * Insert table of size kxk,enter size of rowa and column
     */
    const insertTable = useCallback(() => {
        try {
            const tableSize = prompt("Enter table size (e.g. 3x3)", "3x3");
            if (!tableSize) return;
            const [rows, columns] = tableSize.split("x").map(Number);
            if (!rows || !columns) {
                alert("Invalid table size format. Use e.g. 3x3");
                return;
            }

            const tableRows: TableRowElement[] = [];

            for (let i = 0; i < rows; i++) {
                const tableCells: TableCellElement[] = [];
                for (let j = 0; j < columns; j++) {
                    tableCells.push({
                        type: "table-cell",
                        children: [{ text: "" }]
                    });
                }
                tableRows.push({
                    type: "table-row",
                    children: tableCells
                });
            }

            const tableNode: TableElement = {
                type: "table",
                children: tableRows
            };

            Transforms.insertNodes(editor, tableNode);
        } catch (error: any) {
            addMessage({ message: `Error while inserting image,${error.message}`, type: "error" })

        }
    }, [editor]);

    /**
     * a function which will show a popup window of emojies and allow to pick emoji
     */
    const insertEmoji = useCallback((emoji: string) => {
        try {
            const emojiNode: CustomText = {
                text: emoji
            }
            Transforms.insertNodes(editor, emojiNode)
        } catch (error: any) {
            addMessage({ message: `Error while inserting image,${error.message}`, type: "error" })

        }
    }, [editor])

    const showEmojiPicker = useCallback(() => {
        setEmojiPickerEditor(editor);
        setEmojiPickerOpen((prev) => !prev);
    }, [isEmojiPickerOpen, emojiPickerEditor]);

    const closeEmojiPicker = useCallback(() => {
        setEmojiPickerOpen(false);
        setEmojiPickerEditor(null);
    }, []);

    // In your CreatePostProvider:

    const showColorPicker = useCallback(
        (isBackground = false) => {
            setColorPickerEditor(editor);
            setBackgroundColorPicked(isBackground);
            setColorPickerOpen(true);
        },
        []
    );

    const closeColorPicker = useCallback(() => {
        setColorPickerOpen(false);
        setColorPickerEditor(null);
    }, [colorPickerEditor, isColorPickerOpen]);

    const pickColor = useCallback(
        (color: string) => {
            try {
                if (!color || !colorPickerEditor) return;
                if (isBackgroundColorPicked) {
                    setSelectedBackgroundColor(color);
                    setMark(colorPickerEditor, "backgroundColor", color);
                } else {
                    setSelectedTextColor(color);
                    setMark(colorPickerEditor, "color", color);
                }
                // Close after pick
                // closeColorPicker();
            } catch (error: any) {
                alert(`Error while picking color: ${error.message}`);
            }
        },
        [colorPickerEditor, isBackgroundColorPicked, closeColorPicker]
    );

    const openCloseSpecialSymbolPicker = useCallback(() => {
        setSpecialSymbolPickerOpen(prev => !prev)
    }, [isSpecialSymbolPickerOpen])



    const insertSymbol = useCallback((symbol: string) => {
        try {
            Transforms.insertText(editor, symbol);
            openCloseSpecialSymbolPicker()
        } catch (error: any) {
            alert(`Error while inserting symbol, ${error.message}`)
        }
    }, [editor]);

    const handleRemoveImage = useCallback(async (element: any) => {
        try {
            const path = ReactEditor.findPath(editor, element);
            const encodedId = encodeURIComponent(element.public_id);
            const res = await apiHelper({ method: "DELETE", url: `http://localhost:8000/api/image/${encodedId}` });
            console.log("res", res)
            Transforms.removeNodes(editor, { at: path })
        } catch (error) {
            console.log("error removing image")
        }
    }, [])

    /* ---------- Renderers ---------- */
    const renderLeaf = useCallback((props: RenderLeafProps) => {
        //a leaf is a part of a text node that can have formatting/marks:
        const { attributes,children,leaf } = props;

        let style: React.CSSProperties = {};
        if (leaf.color) style.color = leaf.color;
        if (leaf.backgroundColor) style.backgroundColor = leaf.backgroundColor;
        if (leaf.fontSize) style.fontSize = leaf.fontSize;
        if (leaf.fontFamily) style.fontFamily = leaf.fontFamily;
        let decoratedChildren = children;
        if (leaf.bold)
            decoratedChildren = <strong>{decoratedChildren}</strong>;
        if (leaf.italic)
            decoratedChildren = <em>{decoratedChildren}</em>;
        if (leaf.underline)
            decoratedChildren = <u>{decoratedChildren}</u>;
        if (leaf.strikethrough)
            decoratedChildren = <s>{decoratedChildren}</s>;
        if (leaf.code)
            decoratedChildren = <code>{decoratedChildren}</code>;
        if (leaf.subscript)
            decoratedChildren = <sub>{decoratedChildren}</sub>;
        if (leaf.superscript)
            decoratedChildren = <sup>{decoratedChildren}</sup>;
        if (leaf.highlight)
            decoratedChildren = <mark>{decoratedChildren}</mark>;
        return <span {...attributes} style={style}>{decoratedChildren}</span>;
    }, []);


    const renderElement = useCallback((props: RenderElementProps) => {
        const { element, attributes, children } = props
        switch (element.type) {
            case 'heading-one':
                return <h1 {...attributes} className="text-3xl font-bold">{children}</h1>;
            case 'heading-two':
                return <h2 {...attributes} className="text-2xl font-semibold">{children}</h2>;
            case 'block-quote':
                return (
                    <blockquote {...attributes} className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
                        {children}
                    </blockquote>
                );
            case 'bulleted-list':
                return <ul {...attributes} className="list-disc list-inside">{children}</ul>;
            case 'numbered-list':
                return <ol {...attributes} className="list-decimal list-inside">{children}</ol>;
            case 'check-list':
                return <ul {...attributes} className="list-none">{children}</ul>;
            case 'alphabetic-list':
                return (
                    <ol style={{ listStyleType: 'lower-alpha' }} {...attributes} className="list-inside">
                        {children}
                    </ol>
                );
            case 'roman-list':
                return (
                    <ol style={{ listStyleType: 'lower-roman' }} {...attributes} className="list-inside">
                        {children}
                    </ol>
                );
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'align-left':
                return <div style={{ textAlign: 'left' }} {...attributes}>{children}</div>;
            case 'align-center':
                return <div style={{ textAlign: 'center' }} {...attributes}>{children}</div>;
            case 'align-right':
                return <div style={{ textAlign: 'right' }} {...attributes}>{children}</div>;
            case 'justify':
                return <div style={{ textAlign: 'justify' }} {...attributes}>{children}</div>;
            case 'callout':
                return (
                    <div {...attributes} className="bg-yellow-100 border-l-4 border-yellow-400 p-2 rounded text-sm">
                        {children}
                    </div>
                );
            case 'table':
                return <table {...attributes} className="border border-gray-300"><tbody>{children}</tbody></table>;
            case 'table-row':
                return <tr {...attributes}>{children}</tr>;
            case 'table-cell':
                return <td {...attributes} className="border border-gray-300 px-2 py-1">{children}</td>;
            case 'image':
                return <RenderImageElement attributes={attributes} children={children} element={element} handleRemoveImage={handleRemoveImage} />;
            case 'code-block':
                return <RenderCodeBlock attributes={attributes} children={children} />;
            case 'horizontal-rule':
                return <hr {...attributes} className="my-4 border-t-4 border-gray-300" />;
            case 'link':
                return (
                    <a
                        {...attributes}
                        href={element.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        {children}
                    </a>
                );
            case 'video':
                return <RenderVideoElement attributes={attributes} children={children} element={element} />;
            default:
                return <p {...attributes}>{children}</p>;
        }
    }, []);

    const handleStatusChange = (
        type: HandleChangeType,
        scheduledAt?: Date | undefined
    ) => {
        const now = new Date();

        let payload: BlogStatusType;

        switch (type) {
            case "SET_PUBLISH":
                payload = {
                    isPublished: true,
                    isScheduled: false,
                    isUnpublish: false,
                    scheduledAt: undefined,
                };
                break;
            case "SET_UNPUBLISH":
                payload = {
                    isPublished: false,
                    isScheduled: false,
                    isUnpublish: true,
                    scheduledAt: undefined,
                };
                break;
            case "SET_SCHEDULED":
                payload = {
                    isPublished: false,
                    isScheduled: true,
                    isUnpublish: false,
                    scheduledAt: now,
                };
                break;
            case 'SET_SCHEDULED_DATE':
                payload = {
                    ...statusState,
                    scheduledAt: scheduledAt
                }
        }

        statusDispatch({ type, payload });
    };




    const value = useMemo(() => ({
        editor,
        increaseDecreaseFont,
        insertImage,
        pickImage,
        pickVideo,
        insertVideo,
        insertURL,
        insertHorizontalLine,
        insertTable,
        isEmojiPickerOpen,
        closeEmojiPicker,
        emojiPickerEditor,
        showEmojiPicker,
        showColorPicker,
        closeColorPicker,
        isColorPickerOpen,
        colorPickerEditor,
        insertEmoji,
        pickColor,
        selectedBackgroundColor,
        selectedTextColor,
        isBackgroundColorPicked,
        renderLeaf,
        renderElement,
        openCloseSpecialSymbolPicker,
        isSpecialSymbolPickerOpen,
        insertSymbol,
        title,
        setTitle,
        content,
        setContent,
        handleRemoveImage,
        initialValue,
        step,
        setStep,
        selectedTags,
        setSelectedTags,
        setSelectedCategory,
        selectedCategory,
        blogItToEdit,
        setBlogIdToEdit,
        editors,
        setEditors,
        blog,
        setBlog,
        statusState, statusDispatch,
        handleStatusChange


    }), [
        editor,
        increaseDecreaseFont,
        insertImage,
        pickImage,
        pickVideo,
        insertVideo,
        insertURL,
        insertHorizontalLine,
        insertTable,
        isEmojiPickerOpen,
        closeEmojiPicker,
        emojiPickerEditor,
        showEmojiPicker,
        showColorPicker,
        closeColorPicker,
        isColorPickerOpen,
        colorPickerEditor,
        insertEmoji,
        pickColor,
        selectedBackgroundColor,
        selectedTextColor,
        isBackgroundColorPicked,
        renderLeaf,
        renderElement,
        openCloseSpecialSymbolPicker,
        isSpecialSymbolPickerOpen,
        insertSymbol,
        title,
        setTitle,
        content,
        setContent,
        handleRemoveImage,
        initialValue,
        step,
        setStep,
        selectedTags,
        setSelectedTags,
        setSelectedCategory,
        selectedCategory,
        blogItToEdit,
        setBlogIdToEdit,
        editors,
        setEditors,
        blog, setBlog,
        statusState, statusDispatch,
        handleStatusChange


    ])


    return <CreatePostContext.Provider value={value}>
        {children}
    </CreatePostContext.Provider>

}
export default CreatePostProvider
export const useCreateContext = () => {
    const context = useContext(CreatePostContext)
    if (!context) {
        throw new Error("useCreateContext must be within CreateContextProvider")
    }
    return context
}
