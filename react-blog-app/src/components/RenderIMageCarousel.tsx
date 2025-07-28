import { memo, useState } from "react"
import { FaAngleLeft, FaAngleRight, FaTimes } from "react-icons/fa"

const RenderImageCarousel =memo(({ images, startIndex, onClose }: {
    images: any[]
    startIndex: number
    onClose: () => void
}) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex)

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center'>
            <button onClick={onClose} className='absolute top-4 right-4 text-white text-2xl'>
                <FaTimes />
            </button>

            <button onClick={prevImage} className='absolute left-4 text-white text-4xl'>
                <FaAngleLeft />
            </button>

            <img
                src={images[currentIndex].url}
                alt=''
                className='max-w-[90vw] max-h-[90vh] object-contain rounded shadow'
            />

            <button onClick={nextImage} className='absolute right-4 text-white text-4xl'>
                <FaAngleRight />
            </button>
        </div>
    )
})

export default RenderImageCarousel