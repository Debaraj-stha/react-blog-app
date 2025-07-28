import React from 'react';

import type { ContentNode } from '../types/blog';
import { findFirstImageBlock } from '../helper/utils';

type Props = {
  content: ContentNode[] // or whatever type your `content` is
};
const imagePlaceholder = "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?w=1200&ssl=1"
const BlogImage = ({ content }: Props) => {
  const imageBlock = findFirstImageBlock(content)
  if (!imageBlock) return (
    <img
      src={imagePlaceholder}
      alt="blog image"
      loading="lazy"
      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
  );
  const imageSRC =
    imageBlock.url ||
    imageBlock?.children?.[0]?.url ||
    imagePlaceholder;

  const altText =
    imageBlock?.children?.[0]?.text ||
    "blog image";
 

  return (
    <img
      src={imageSRC}
      alt={altText}
      loading="lazy"
      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
  );
};

export default BlogImage;
