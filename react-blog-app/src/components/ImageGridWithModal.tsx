import React, { useState, useMemo, memo, useEffect } from 'react'
import { BiFullscreen } from 'react-icons/bi'
import RenderImageCarousel from './RenderIMageCarousel'
import ToolTip from './ToolTip'

const ImageGridWithModal = memo(({
  images,
  startIndex = 0,
}: {
  images: any[]
  startIndex?: number
}) => {
  const [isCarouselOpen, setCarouselOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const imageToRender = images.length > 3 ? images.slice(0, 3) : images
  const shouldShowRemainingImage = imageToRender.length === 3 && images.length > 3

  const imageLength = images.length
  const gridClasses = useMemo(() => {
    if (imageLength === 1) return ''
    if (imageLength === 2) return 'grid grid-cols-1 sm:grid-cols-2'
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
  }, [imageLength])


  useEffect(() => {
    const images = document.querySelectorAll(".blog-image img");
    //Creates an IntersectionObserver instance.
    //It will monitor when elements scroll into the viewport.
    const observer = new IntersectionObserver(
     // An array of what changed (each element that intersected the viewport).
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target); // optional: animate only once
          }
        });
      },
      {
        threshold: 0.1, // trigger when 10% of the image is visible
      }
    );

    images.forEach(img => observer.observe(img));

    return () => observer.disconnect(); // clean up
  }, []);



  if (isCarouselOpen) {
    return (
      <RenderImageCarousel
        images={images}
        startIndex={activeIndex}
        onClose={() => setCarouselOpen(false)}
      />
    )
  }

  return (
    <div key={`image-grid-${startIndex}`} className={`relative grid gap-4 my-6 ${gridClasses}`}>
      {imageToRender.map((img, i) => {
        const isLastImageWithOverlay = shouldShowRemainingImage && i === 2
        return (
          <div key={i} className="relative blog-image">
            <img
              src={img.url}
              alt={img.alt || ''}
              className="w-full h-auto object-cover rounded shadow"
            />
            {isLastImageWithOverlay && (
              <div
                onClick={() => {
                  setActiveIndex(i)
                  setCarouselOpen(true)
                }}
                className="absolute inset-0 bg-gray-900 opacity-60 text-white flex items-center justify-center rounded z-10 cursor-pointer"
              >
                +{images.length - 3} more
              </div>
            )}
            {!shouldShowRemainingImage && (
              <button
                onClick={() => {
                  setActiveIndex(i)
                  setCarouselOpen(true)
                }}
                className="absolute top-0 left-0 text-black opacity-50 p-1 rounded"
              >
                <ToolTip message='Full Screen'>
                  <BiFullscreen />
                </ToolTip>

              </button>
            )}
          </div>
        )
      })}
    </div>
  )
})


export default ImageGridWithModal