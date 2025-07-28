import React, {memo, type ReactNode } from 'react'
import type { ContentNode } from '../types/blog'
import RenderCodeBlock from './RenderElements/RenderCodeBlock'
import type { ListItem } from '../types/slate'
import { BiFullscreen, BiZoomIn } from 'react-icons/bi';
import ImageGridWithModal from './ImageGridWithModal';

const RenderBlogContent = memo(({ content }: { content: ContentNode[] }) => {

    const isEmptyParagraph = (node: any) =>
        node.type === "paragraph" &&
        (!node.children || node.children.every((child: any) => !child.text || child.text.trim() === ""));

    const renderLeaf = (leaf: any, index: number) => {
        let text = leaf.text;
        if (!text) return null;

        let decorated = <>{text}</>;

        if (leaf.bold) decorated = <strong>{decorated}</strong>;
        if (leaf.italic) decorated = <em>{decorated}</em>;
        if (leaf.underline) decorated = <u>{decorated}</u>;
        if (leaf.strikethrough) decorated = <s>{decorated}</s>;
        if (leaf.code) decorated = <code>{decorated}</code>;
        if (leaf.subscript) decorated = <sub>{decorated}</sub>;
        if (leaf.superscript) decorated = <sup>{decorated}</sup>;
        if (leaf.highlight) decorated = <mark>{decorated}</mark>;

        const style: React.CSSProperties = {};
        if (leaf.color) style.color = leaf.color;
        if (leaf.backgroundColor) style.backgroundColor = leaf.backgroundColor;
        if (leaf.fontSize) style.fontSize = leaf.fontSize;
        if (leaf.fontFamily) style.fontFamily = leaf.fontFamily;

        return (
            <span key={index} style={style}>
                {decorated}
            </span>
        );
    };

    const renderChildren = (children: any[]) =>
        children.map((child, i) => {
            if (child.text !== undefined) {
                return renderLeaf(child, i);
            }
            return renderElement(child, i);
        });

    const renderElement = (node: any, index: number): React.ReactNode => {
        const children = renderChildren(node.children || []);

        switch (node.type) {
            case 'heading-one':
                return <h1 key={index} className="text-3xl font-bold">{children}</h1>;
            case 'heading-two':
                return <h2 key={index} className="text-2xl font-semibold">{children}</h2>;
            case 'block-quote':
                return <blockquote key={index} className="border-l-4 border-gray-400 pl-4 italic text-gray-600">{children}</blockquote>;
            case 'bulleted-list':
                return <ul key={index} className="list-disc list-inside">{node.children.map((li: ListItem, i: number) => renderElement(li, i))}</ul>;
            case 'numbered-list':
                return <ol key={index} className="list-decimal list-inside">{node.children.map((li: ListItem, i: number) => renderElement(li, i))}</ol>;
            case 'check-list':
                return <ul key={index}>{node.children.map((li: ListItem, i: number) => renderElement(li, i))}</ul>;
            case 'alphabetic-list':
                return <ol key={index} style={{ listStyleType: 'lower-alpha' }} className='list-inside'>{node.children.map((li: ListItem, i: number) => renderElement(li, i))}</ol>;
            case 'roman-list':
                return <ol key={index} style={{ listStyleType: 'lower-roman' }} className='list-inside'>{node.children.map((li: ListItem, i: number) => renderElement(li, i))}</ol>;
            case 'list-item':
                return <li key={index}>{children}</li>;
            case 'align-left':
                return <div key={index} style={{ textAlign: 'left' }}>{children}</div>;
            case 'align-center':
                return <div key={index} style={{ textAlign: 'center' }}>{children}</div>;
            case 'align-right':
                return <div key={index} style={{ textAlign: 'right' }}>{children}</div>;
            case 'justify':
                return <div key={index} style={{ textAlign: 'justify' }}>{children}</div>;
            case 'callout':
                return <div key={index} className="bg-yellow-100 border-l-4 border-yellow-400 p-2 rounded text-sm">{children}</div>;
            case 'code-block':
                return <RenderCodeBlock key={index} children={children} attributes={node.attributes} />;
            case 'horizontal-rule':
                return <hr key={index} className="my-4 border-t-4 border-gray-300" />;
            case 'link':
                return (
                    <a
                        key={index}
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        {children}
                    </a>
                );
            case 'image':
                return (
                    <img
                        key={index}
                        src={node.url}
                        alt={node.alt || ''}
                        className="w-full h-auto object-cover rounded shadow"
                    />
                );
            case 'video':
                return (
                    <div key={index} className="my-4">
                        <video controls className="max-w-full">
                            <source src={node.url} type="video/mp4" />
                        </video>
                    </div>
                );
            case 'table':
                return (
                    <table key={index} className="table-auto border-collapse border border-gray-400 my-4">
                        <tbody>{children}</tbody>
                    </table>
                );
            case 'table-row':
                return <tr key={index} className="border border-gray-300">{children}</tr>;
            case 'table-cell':
                return (
                    <td key={index} className="border border-gray-300 px-4 py-2">
                        {children}
                    </td>
                );
            default:
                return <p key={index} className="my-2">{children}</p>;
        }
    };


    const renderedContent: ReactNode[] = [];
    const groupedImage = () => {
        for (let i = 0; i < content.length; i++) {
            const node = content[i];

            if (node.type === "image") {
                const imageGroup = [node];
                let j = i + 1;

                while (j < content.length) {
                    const next = content[j];
                    if (next.type === "image") {
                        imageGroup.push(next);
                        j++;
                    } else if (isEmptyParagraph(next)) {
                        j++; // skip empty
                    } else {
                        break;
                    }
                }

                renderedContent.push(renderedContent.push(<ImageGridWithModal key={i} images={imageGroup} startIndex={i} />)
                );
                i = j - 1; // skip processed images
            } else if (!isEmptyParagraph(node)) {
                renderedContent.push(renderElement(node, i));
            }
        }
    }
    groupedImage()

    return <div className="prose max-w-none">{renderedContent}</div>;
});

export default RenderBlogContent;
