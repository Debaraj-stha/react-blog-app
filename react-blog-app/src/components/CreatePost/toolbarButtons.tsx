import ToolbarButton from "./ToolbarButton";
import { isBlockActive, isMarkActive, toggleBlock, toggleList, toggleMark } from "./helper";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiMinus

} from "react-icons/fi";
import { BiCodeAlt, BiCodeBlock, BiImage, BiImages, BiLink, BiStrikethrough } from "react-icons/bi";
import { FaListOl, FaListUl } from "react-icons/fa";
import { BsEmojiSmile, BsQuote } from "react-icons/bs";
import { FaListCheck } from "react-icons/fa6";
import { LiaSortAlphaUpSolid } from "react-icons/lia";
import { RiListOrdered2 } from "react-icons/ri";
import {
  MdEmojiSymbols,
  MdFormatAlignJustify,
  MdFormatClear,
  MdFormatColorFill,
  MdOndemandVideo,
  MdOutlineAnnouncement,
  MdOutlineHighlightAlt,
  MdRedo,
  MdSubscript,
  MdSuperscript,
  MdTableChart,
  MdUndo
} from "react-icons/md";
import { TbH1, TbH2 } from "react-icons/tb";
import { MdFormatColorText } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HistoryEditor, } from "slate-history";
import { useCreateContext } from "../../Provider/CreatePostProvider";

export const getToolbarButtons = () => {
    const {
    editor,
    increaseDecreaseFont,
    pickImage,
    pickVideo,
    insertURL,
    insertHorizontalLine,
    insertTable,
    showEmojiPicker,
    showColorPicker,
    selectedTextColor,
    selectedBackgroundColor,
    openCloseSpecialSymbolPicker

  } = useCreateContext()
  const canUndo = editor.history.undos.length > 0;
  const canRedo = editor.history.redos.length > 0;

  const textColorIcon = (
    <div className="flex items-center gap-1">
      <MdFormatColorText />
      <span className="inline-block w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: selectedTextColor }} />
    </div>
  );

  const backgroundColorIcon = (
    <div className="flex items-center gap-1">
      <MdFormatColorFill />
      <span className="inline-block w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: selectedBackgroundColor }} />
    </div>
  );

  return [
    { onClick: () => increaseDecreaseFont('increase'), active: false, icon: <AiOutlinePlus />, tooltip: "Increase font", disabled: false },
    { onClick: () => increaseDecreaseFont('decrease'), active: false, icon: <AiOutlineMinus />, tooltip: "Decrease font", disabled: false },
    { onClick: () => toggleMark(editor, 'bold'), active: isMarkActive(editor, 'bold'), icon: <FiBold />, tooltip: "Bold", disabled: false },
    { onClick: () => toggleMark(editor, 'italic'), active: isMarkActive(editor, 'italic'), icon: <FiItalic />, tooltip: "Italic", disabled: false },
    { onClick: () => toggleMark(editor, 'underline'), active: isMarkActive(editor, 'underline'), icon: <FiUnderline />, tooltip: "Underline", disabled: false },
    { onClick: () => toggleMark(editor, 'strikethrough'), active: isMarkActive(editor, 'strikethrough'), icon: <BiStrikethrough />, tooltip: "Strikethrough", disabled: false },
    { onClick: () => toggleMark(editor, 'code'), active: isMarkActive(editor, 'code'), icon: <BiCodeAlt />, tooltip: "Inline Code", disabled: false },
    { onClick: () => toggleMark(editor, 'highlight'), active: isMarkActive(editor, 'highlight'), icon: <MdOutlineHighlightAlt />, tooltip: "Highlight", disabled: false },
    { onClick: () => toggleMark(editor, 'subscript'), active: isMarkActive(editor, 'subscript'), icon: <MdSubscript />, tooltip: "Subscript", disabled: false },
    { onClick: () => toggleMark(editor, 'superscript'), active: isMarkActive(editor, 'superscript'), icon: <MdSuperscript />, tooltip: "Superscript", disabled: false },
    { onClick: () => toggleBlock(editor, 'heading-one'), active: isBlockActive(editor, 'heading-one'), icon: <TbH1 />, tooltip: "Heading 1", disabled: false },
    { onClick: () => toggleBlock(editor, 'heading-two'), active: isBlockActive(editor, 'heading-two'), icon: <TbH2 />, tooltip: "Heading 2", disabled: false },
    { onClick: () => toggleBlock(editor, 'block-quote'), active: isBlockActive(editor, 'block-quote'), icon: <BsQuote />, tooltip: "Block Quote", disabled: false },
    { onClick: () => toggleBlock(editor, 'code-block'), active: isBlockActive(editor, 'code-block'), icon: <BiCodeBlock />, tooltip: "Code Block", disabled: false },
    { onClick: () => toggleList(editor, 'bulleted-list'), active: isBlockActive(editor, 'bulleted-list'), icon: <FaListUl />, tooltip: "Bulleted List", disabled: false },
    { onClick: () => toggleList(editor, 'numbered-list'), active: isBlockActive(editor, 'numbered-list'), icon: <FaListOl />, tooltip: "Numbered List", disabled: false },
    { onClick: () => toggleList(editor, 'check-list'), active: isBlockActive(editor, 'check-list'), icon: <FaListCheck />, tooltip: "Check List", disabled: false },
    { onClick: () => toggleList(editor, 'alphabetic-list'), active: isBlockActive(editor, 'alphabetic-list'), icon: <LiaSortAlphaUpSolid />, tooltip: "Alphabetic List", disabled: false },
    { onClick: () => toggleList(editor, 'roman-list'), active: isBlockActive(editor, 'roman-list'), icon: <RiListOrdered2 />, tooltip: "Roman List", disabled: false },
    { onClick: () => toggleBlock(editor, 'align-left'), active: isBlockActive(editor, 'align-left'), icon: <FiAlignLeft />, tooltip: "Align Left", disabled: false },
    { onClick: () => toggleBlock(editor, 'align-center'), active: isBlockActive(editor, 'align-center'), icon: <FiAlignCenter />, tooltip: "Align Center", disabled: false },
    { onClick: () => toggleBlock(editor, 'align-right'), active: isBlockActive(editor, 'align-right'), icon: <FiAlignRight />, tooltip: "Align Right", disabled: false },
    { onClick: () => toggleBlock(editor, 'justify'), active: isBlockActive(editor, 'justify'), icon: <MdFormatAlignJustify />, tooltip: "Justify", disabled: false },
    { onClick: () => insertURL(), active: false, icon: <BiLink />, tooltip: "Insert Link", disabled: false },
    { onClick: () => pickImage(), active: false, icon: <BiImage />, tooltip: "Insert Image", disabled: false },
    { onClick: () => pickImage(true), active: false, icon: <BiImages />, tooltip: "Insert Images", disabled: false },
    { onClick: () => pickVideo(), active: false, icon: <MdOndemandVideo />, tooltip: "Insert Video", disabled: false },
    { onClick: () => insertHorizontalLine(), active: false, icon: <FiMinus />, tooltip: "Horizontal Rule", disabled: false },
    { onClick: () => insertTable(), active: false, icon: <MdTableChart />, tooltip: "Insert Table", disabled: false },
    { onClick: () => HistoryEditor.undo(editor as HistoryEditor), active: false, icon: <MdUndo />, tooltip: "Undo", disabled: !canUndo },
    { onClick: () => HistoryEditor.redo(editor as HistoryEditor), active: false, icon: <MdRedo />, tooltip: "Redo", disabled: !canRedo },
    { onClick: () => {}, active: false, icon: <MdFormatClear />, tooltip: "Clear Formatting", disabled: false },
    { onClick: () => showColorPicker(false), active: false, icon: textColorIcon, tooltip: "Text Color", disabled: false },
    { onClick: () => showColorPicker(true), active: false, icon: backgroundColorIcon, tooltip: "Background Color", disabled: false },
    { onClick: () => showEmojiPicker(), active: false, icon: <BsEmojiSmile />, tooltip: "Insert Emoji", disabled: false },
    { onClick: () => openCloseSpecialSymbolPicker(), active: false, icon: <MdEmojiSymbols />, tooltip: "Insert Symbol", disabled: false },
    { onClick: () => toggleBlock(editor, 'callout'), active: isBlockActive(editor, 'callout'), icon: <MdOutlineAnnouncement />, tooltip: "Callout", disabled: false },
  ];
};
