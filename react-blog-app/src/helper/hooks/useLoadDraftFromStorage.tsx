import { useEffect, useState } from "react";
import SaveToLocalStorage from "../autoSaveBlogToLocalstorage";
import { useAuth } from "../../Provider/AuthProvider";
import type { LocalStorageBlogType } from "../../types/localStorageBlogType";
import { useCreateContext } from "../../Provider/CreatePostProvider";
import { Editor, Transforms } from "slate";

const useLoadDraftFromStorage = () => {
    const { user } = useAuth()
    const {
        editor,
        setTitle,
        content,
        setContent,
        title,
        selectedTags,
        setSelectedTags,
        editors,
        selectedCategory,
        setSelectedCategory,
        setEditors,
    } = useCreateContext();
    const [storage, setStorage] = useState<SaveToLocalStorage | null>(null);
    // Load from localStorage on mount
    useEffect(() => {
        if (!user?.user_id) return;

        const storageInstance = new SaveToLocalStorage(user.user_id);
        setStorage(storageInstance);

        const saved: LocalStorageBlogType | undefined = SaveToLocalStorage.getBlog(user.user_id);
        if (saved) {
            const parsedContent = Array.isArray(saved.content) ? saved.content : [];

            // Clear current content
            Transforms.delete(editor, {
                at: {
                    anchor: Editor.start(editor, []),
                    focus: Editor.end(editor, []),
                },
            });

            // Insert saved content
            if (parsedContent.length > 0) {
                Transforms.insertNodes(editor, parsedContent);
                setContent(parsedContent);
            }

            // Restore title, tags, editors
            if (saved.title) setTitle(saved.title);
            if (saved.tags) setSelectedTags(saved.tags);
            if (saved.editors) setEditors(saved.editors);
            if(saved.category) setSelectedCategory(saved.category)
        }
        return () => setStorage(null);
    }, [user?.user_id]);

    // Auto-save every 1 minute
    useEffect(() => {
        if (!storage) return;

        const oneMinute = 1000 * 60;

        const timer = setInterval(() => {
            if (title.trim() ||
                content.length > 0 ||
                selectedTags.length > 0 ||
                selectedCategory ||
                editors !== undefined) {
                const blog: LocalStorageBlogType = {
                    content,
                    title,
                    tags: selectedTags,
                    editors,
                    category: selectedCategory
                };

                storage.save(blog);
                console.log("Draft auto-saved to localStorage", blog);
            }
        }, oneMinute);

        return () => clearInterval(timer);
    }, [storage, title, content, JSON.stringify(selectedTags), JSON.stringify(editors)]);
}
export default useLoadDraftFromStorage