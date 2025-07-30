import { Helmet } from "react-helmet";
import ColorPickerWindow from "../components/CreatePost/ColorPickerWindow";
import EmojiPickerWindow from "../components/CreatePost/EmojiPickerWindow";
import SpecialSymbolPicker from "../components/CreatePost/SpecialSymbolPicker";
import StepForm from "../components/CreatePost/StepForm";
import { useAuth } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log("user",user)

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-12 text-gray-800">
      <Helmet>
        <title>Create Post - React Blog App</title>
        <meta name="description" content="Create and publish your blog post using the React Blog App." />
        <meta name="keywords" content="react, blog, articles, posts, create post" />
      </Helmet>

      {user ? (
        <>
          <div className="space-y-6">
            <StepForm />
            <EmojiPickerWindow />
            <ColorPickerWindow />
            <SpecialSymbolPicker />
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-gray-200 dark:bg-gray-600 rounded-xl shadow-md">
          <h2 className="text-2xl font-medium mb-4 text-gray-800 dark:text-gray-100">You're not an author yet.</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-200">To create posts, please create an author account.</p>
          <button
            onClick={() => navigate("/create-author-account",{state:{from:"/create-post"}})}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-200"
          >
            Create Author Account
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
