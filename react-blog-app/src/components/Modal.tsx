import  { type ReactNode } from 'react'
type Props={
    children:ReactNode
    extraClassName?:string
}
const Modal = ({children,extraClassName}:Props) => {
  return (
       <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 ${extraClassName}`}>
        {children}
        </div>
  )
}

export default Modal
