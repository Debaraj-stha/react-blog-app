import { TiTimes } from "react-icons/ti";
import type { EditorType } from "../../types/CreatePostType";

type RenderEditorCardProps = EditorType & {
  onRemove?: (id: string) => void;
};

const RenderEditorCard = ({ name, _id, profile, onRemove }: RenderEditorCardProps) => {
  return (
    <div className="group relative dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer transition duration-200 flex items-center gap-3 p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-2">
      {profile ? (
        <img
          src={profile}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-200 font-bold">
          {name
            .split(" ")
            .map((word) => word[0]?.toUpperCase())
            .join("")}
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {_id}</p>
      </div>
      {onRemove && (
        <div
          onClick={() => onRemove(_id)}
          className="absolute top-0 right-2 hidden group-hover:block hover:bg-gray-100 rounded shadow-2xl hover:animate-pulse"
        >
          <TiTimes size={20} className="text-red-500" />
        </div>
      )}
    </div>
  );
};

export default RenderEditorCard