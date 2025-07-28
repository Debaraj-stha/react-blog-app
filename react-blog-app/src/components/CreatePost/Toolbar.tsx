import ToolbarButton from "./ToolbarButton";
import { useState } from "react";
import FontFamilySelectBox from "./FontFamilySelectBox";
import FontSizeSelectBox from "./FontSizeSelectBox";
import { useCreateContext } from "../../Provider/CreatePostProvider";
import { getToolbarButtons } from "./toolbarButtons";



const Toolbar = () => {

  const [showAll, setShowAll] = useState(false);


  const buttons = getToolbarButtons();

  const visibleButtons = showAll ? buttons : buttons.slice(0, 15);


  return (
    <div className="sticky top-0 z-10 bg-white py-2 border-b border-gray-300 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <FontFamilySelectBox />
        <FontSizeSelectBox />
        {visibleButtons.map((btn, idx) => (
          <ToolbarButton
            key={idx}
            onClick={btn.onClick}
            active={btn.active}
            icon={btn.icon}
            tooltip={btn.tooltip}
            disabled={btn.disabled}
          />
        ))}
        {buttons.length > 15 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-600 underline px-2 py-1"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>

  );
};

export default Toolbar;
