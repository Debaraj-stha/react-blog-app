import { memo } from "react";
import ToolTip from "../ToolTip";

type TollbarButtonProps = {
    onClick: () => void;
    active: boolean;
    icon: React.ReactNode,
    disabled: boolean,
    tooltip?: string,

}
const ToolbarButton =memo( ({ onClick, active, icon, disabled, tooltip }: TollbarButtonProps) => {
    return (
        <ToolTip message={tooltip}>
            <button
                type="button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                disabled={disabled}
                className={`p-2 m-0 rounded transition
                ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500' :
                        active ? 'bg-blue-500 text-white' :
                            'hover:bg-gray-200'}
            `}

            >
                {icon}
            </button>
        </ToolTip>
    );
})
export default ToolbarButton