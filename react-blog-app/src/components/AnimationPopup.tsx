import React, { useMemo, type ReactElement } from 'react';
import '../css/animation/pop-up-animation.css';

import { FaTimesCircle } from 'react-icons/fa';
import { BsCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs';
import { BiCheckCircle } from 'react-icons/bi';

type MessageType = "success" | "info" | "error" | "warning";

type AnimationPopupProps = {
  message?: string;
  title?: string;
  children?: ReactElement;
  messageType?: MessageType;
}

const AnimationPopup = ({
  message = "Animating Pop up",
  title = "Success",
  children,
  messageType = "success"
}: AnimationPopupProps) => {

  const { Icon, colorClass } = useMemo(() => {
    switch (messageType) {
      case "error":
        return { Icon: FaTimesCircle, colorClass: "text-red-400" };
      case "info":
        return { Icon: BsQuestionCircleFill, colorClass: "text-blue-400" };
      case "warning":
        return { Icon: BiCheckCircle, colorClass: "text-yellow-400" };
      case "success":
      default:
        return { Icon: BsCheckCircleFill, colorClass: "text-green-400" };
    }
  }, [messageType]);

  return (
    <div className='fixed inset-0 w-full h-full flex items-center justify-center bg-black/75 z-50'>
      <div className='bg-white px-4 py-6 max-w-2xl w-full mx-4 rounded shadow min-h-72 flex flex-col items-center justify-center animate-zoomIn'>
        <div className='text-black text-center flex flex-col items-center'>
          <h1 className={`font-bold text-2xl mb-2 ${colorClass}`}>{title}</h1>
          <div className='my-2'>
            <Icon className={`w-20 h-20 animate-icon-zoomIn ${colorClass}`} />
          </div>
          <p className='mb-4'>{message}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AnimationPopup;
