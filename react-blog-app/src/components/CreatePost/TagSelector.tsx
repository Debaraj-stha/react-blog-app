import EditorAndBlogStatus from "./EditorAndBlogStatus";
import SuggestedTags from "./SuggestedTags";
import RenderSelectedTags from "./RenderSelectedTags";
import TakeInputTag from "./TakeInputTag";
import SubmitActionButtons from "./SubmitActionButtons";

const TagSelector = ({ isEdit }: { isEdit: boolean }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        Enter Tags for Your Blog
      </h2>
      {/* render entered tags */}
      <RenderSelectedTags />
      {/* take input */}
      <TakeInputTag/>

      {/* Suggested Tags */}
      <SuggestedTags />
      {/* only for editing blogs and only author can add  editors */}
      <EditorAndBlogStatus />
      {/* step buttons */}
     <SubmitActionButtons isEdit={isEdit}/>
    </div>
  );
};

export default TagSelector;
