import React from 'react'
import PopupCard from '../PopupCard';
import { useCreateContext } from '../../Provider/CreatePostProvider';
import { symbols } from '../../static/special_symbols';

const SpecialSymbolPicker = () => {
    const { isSpecialSymbolPickerOpen, openCloseSpecialSymbolPicker, insertSymbol } = useCreateContext();
    return (<>
        {
            isSpecialSymbolPickerOpen && <PopupCard onClick={openCloseSpecialSymbolPicker}>
                <div className="grid grid-cols-6 gap-2 p-2 ">
                    {symbols.map(sym => (
                        <button
                            key={sym}
                            className="p-2 hover:bg-gray-200 rounded text-xl"
                            onClick={() => insertSymbol(sym)}
                        >
                            {sym}
                        </button>
                    ))}
                </div>

            </PopupCard>
        }

    </>

    )
}

export default SpecialSymbolPicker
