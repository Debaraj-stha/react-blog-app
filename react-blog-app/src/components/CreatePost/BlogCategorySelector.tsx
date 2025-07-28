
import { blogCategories } from "../../static/blog-categories"
import { useCreateContext } from "../../Provider/CreatePostProvider";

const BlogCategorySelector = () => {
  const {
    setSelectedCategory,
    selectedCategory,
    setStep
  } = useCreateContext()

  const handleSelect = (label: string) => {
    setSelectedCategory(prev => (prev === label ? "" : label))
  }
  const handleCategoryNext = (category: string) => {
    setSelectedCategory(category);
    setStep(2);
  };
  const onPrevious = () => {
    setStep((prev) => prev - 1)
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        Select a Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {blogCategories.map((category) => {
          const selected = selectedCategory === category.label
          return (
            <button
              key={category.label}
              onClick={() => handleSelect(category.label)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium shadow-sm transition-all ${selected
                ? "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.label}
            </button>
          )
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          Previous
        </button>
        <button
          disabled={!selectedCategory}
          onClick={() => handleCategoryNext(selectedCategory!)}
          className={`px-5 py-2 rounded-lg text-white font-medium transition ${selectedCategory
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default BlogCategorySelector
