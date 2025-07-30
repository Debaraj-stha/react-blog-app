import React, { memo } from 'react'
import apiHelper from '../../helper/api-helper'
import { BASE_URL, BLOG_POST_SUCCESS_REDIRECT_URL } from '../../constraints'
import { useCreateContext } from '../../Provider/CreatePostProvider'
import { useAuth } from '../../Provider/AuthProvider'
import { useMessageContext } from '../../Provider/MessageProviders'
import { useLocation, useNavigate } from 'react-router-dom'
import SaveToLocalStorage from '../../helper/autoSaveBlogToLocalstorage'

const SubmitActionButtons = memo(({isEdit}:{isEdit:boolean}) => {
    const {
        selectedTags,
        setStep,
        title,
        content,
        selectedCategory,
        blogItToEdit,
        editors,
        blog,
        statusState

    } = useCreateContext()
    const { user } = useAuth()
    const { addMessage } = useMessageContext()
    const navigate=useNavigate()
    const location = useLocation()
    //state is uset to pass tempory data without putting in url
    const from = location.state?.from
    const onPrevious = () => {
        setStep((prev) => prev - 1)
    }
    const handleTagsSubmit = async () => {
        const editorsId = editors?.map((editor) => editor._id)
        const data = {
            title,
            content,
            author_id: user?.author_id,
            category: selectedCategory,
            tags: selectedTags,
            editors: editorsId,
            ...statusState
        };
        let res = null;
        if (isEdit) {

            let editor_email = undefined
            if (from === 'eligible') {
                editor_email = user?.email
            }
            res = await apiHelper({
                method: "PUT",
                url: `${BASE_URL}api/blog/${blogItToEdit!}?user_id=${user?.user_id}`,
                data: {
                    ...data,
                    isPublished: blog?.isPublished,
                    isScheduled: blog?.isScheduled,
                    scheduledAt: blog?.scheduledAt,
                    editor_email: editor_email
                }
            })
        }
        else {
            res = await apiHelper({
                method: "POST",
                data,
                url: `${BASE_URL}api/blog/`
            });
        }

        if (res) {
            addMessage({ message: `Blog ${isEdit ? 'Updated' : "Submitted"}`, type: "success" });
            setStep(0);
            navigate(BLOG_POST_SUCCESS_REDIRECT_URL)
            //deleting saved draft after saving to db
            const storage=new SaveToLocalStorage(user?.user_id!)
            storage.delete()
        }
    }

    return (
        <div className="flex justify-between">
            <button
                onClick={onPrevious}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-white transition"
            >
                Previous
            </button>
            <button
                onClick={() => handleTagsSubmit()}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
                {isEdit ? "Update" : "Submit"}
            </button>
        </div>
    )
})

export default SubmitActionButtons
