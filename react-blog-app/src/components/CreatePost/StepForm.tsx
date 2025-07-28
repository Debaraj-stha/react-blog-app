import React, { useCallback, useEffect } from 'react'
import { useCreateContext } from '../../Provider/CreatePostProvider';
import { useMessageContext } from '../../Provider/MessageProviders';
import EditorForm from './EditorForm';
import BlogCategorySelector from './BlogCategorySelector';
import TagSelector from './TagSelector';
import useLoadDraftFromStorage from '../../helper/hooks/useLoadDraftFromStorage';
type Props={
    isEdit?:boolean
}
const StepForm = ({isEdit=false}:Props) => {
    const {
        content,
        title,
        step,
        setStep,
        selectedTags,
        
    } = useCreateContext();

    ;
    const { addMessage } = useMessageContext()
    useEffect(() => {
        if (step === 2 && selectedTags.length === 0)
            setStep(prev => prev - 1)
    }, [])



    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            addMessage({ message: "Cannot submitted,title is required", type: "error" });
            return
        }
        const totalCharacters = content.reduce((sum, block) => {
            const blockTextLength = Array.isArray((block as any).children) &&
                (block as any).children?.reduce((childSum: number, child: any) => {
                    return childSum + (child.text?.length || 0);
                }, 0);
            return sum + (blockTextLength || 0);
        }, 0);
        if (totalCharacters < 100) {
            alert("Total content must be at least 100 characters.");
            return;
        }

        setStep(1); // go to category selection
    }, [title, content]);

    //custom hook to save and load draft from local storage
    useLoadDraftFromStorage()


  
    return (
        <>
            <div className="text-center text-gray-500 mb-4">
                Step {step + 1} of 3
            </div>

            {step === 0 && (
                <>
                    <h1 className="text-4xl font-bold text-center mb-8 text-white">
                        {
                            isEdit ?"Edit Blog":"Create New Post"
                        }
                    </h1>
                    <EditorForm
                        initialValue={content}
                        handleSubmit={handleSubmit}
                    />
                </>
            )}

            {step === 1 && (
                <BlogCategorySelector/>
            )}

            {step === 2 && (
                <TagSelector isEdit={isEdit} />
            )}

        </>
    )

}

export default StepForm
