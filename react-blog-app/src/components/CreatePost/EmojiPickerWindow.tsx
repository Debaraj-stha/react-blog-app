
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';
import { useCreateContext } from '../../Provider/CreatePostProvider';


import { EmojiStyle } from 'emoji-picker-react'
import PopupCard from '../PopupCard';




const EmojiPickerWindow = () => {

  const { isEmojiPickerOpen, closeEmojiPicker } = useCreateContext();
  const style = EmojiStyle.TWITTER
  const{insertEmoji}=useCreateContext()
  return (
    <>
      {isEmojiPickerOpen && (
        <PopupCard onClick={closeEmojiPicker}>
          <EmojiPicker onEmojiClick={(emojiData: EmojiClickData) => insertEmoji(emojiData.emoji)} emojiStyle={style} />
        </PopupCard>
      )}

    </>
  )
}

export default EmojiPickerWindow

