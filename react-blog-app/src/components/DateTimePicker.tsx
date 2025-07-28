import React, { forwardRef, useState } from 'react'
import Modal from './Modal'

type DateTimePickerModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (datetime: string) => void
  initialValue?: string
  title?: string
}

const DateTimePickerModal = forwardRef<HTMLDivElement, DateTimePickerModalProps>(({
  isOpen,
  onClose,
  onSubmit,
  initialValue = '',
  title = 'Pick a Date & Time',
}: DateTimePickerModalProps) => {
  const [selectedDateTime, setSelectedDateTime] = useState(initialValue)
  if (!isOpen) return null

  return (
    <Modal>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>

        <input
          type="datetime-local"
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedDateTime) onSubmit(selectedDateTime)
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
})

export default DateTimePickerModal
