import React, { useCallback, useState } from 'react'
import apiHelper from '../../helper/api-helper';
import { BASE_URL } from '../../constraints';
import { useCreateContext } from '../../Provider/CreatePostProvider';
import NameAvatar from '../NameAvatar';
import RenderEditorCard from './RenderEditorCard';
import type { EditorType } from '../../types/CreatePostType';

const EditorCard = () => {
    const [editorInput, setEditorInput] = useState("")
    const [editorsFromServer, setEditorsFromServer] = useState([]);

    const { editors, setEditors } = useCreateContext()
    const searchEditors = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const value = e.target.value
            setEditorInput(value);
            if (value.trim()) {
                const res = await apiHelper({ url: `${BASE_URL}api/users/search?query=${value}` });
                console.log("res", res)
                setEditorsFromServer(res?.users || []);
            } else {
                setEditorsFromServer([]);
            }


        } catch (error) {
            console.log("error", error)
        }
    }, [])
    const handleClick = (ele: EditorType) => {
        setEditors((prev) =>{
            if(!prev) return [ele]
            else return [...prev,ele]
        })
        const filtered = editorsFromServer.filter((a: any) => a._id !== ele._id)
        setEditorsFromServer(filtered)
    }
    return (
        <div className="my-4">
            <h1 className="text-lg text-white font-semibold mb-2">Editors</h1>
            <div className="flex flex-wrap gap-4">
                {editors !== undefined ? (
                    editors!.map((editor, index) => (
                        <RenderEditorCard
                            key={index}
                            name={editor.name}
                            _id={editor._id}
                            profile={editor.profile}
                            onRemove={() => setEditors((prev) => prev!.filter((e) => e._id !== editor._id))}
                        />
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No editors assigned.</p>
                )}
            </div>
            {/* search editor */}
            <input
                type="text"
                placeholder="Search editor here..."
                value={editorInput}
                onChange={searchEditors}
                className="rounded-lg my-4 px-4 py-2 w-full bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 outline-none"
            />
            {/* editor from server */}
            <div>
                {
                    editorsFromServer.length > 0 ? (
                        <div>
                            {
                                editorsFromServer.map((ele: any, index) => (
                                    <div key={index} className="flex gap-4 my-4 cursor-pointer hover:bg-gray-700 rounded py-4"
                                        onClick={() => handleClick(ele)}
                                    >
                                        {
                                            ele.profile ? (
                                                <img src={ele.profile} className="rounded-full w-12 h-12 object-cover" />
                                            ) : <NameAvatar name={ele.name} />
                                        }
                                        <div className="">
                                            <p className="text-gray-100">{ele.name}</p>
                                            <p className="text-gray-300">{ele.email}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : editorInput !="" ?  (
                        <p className="text-gray-200">No Matching editor found</p>
                    ):null
                }
            </div>
        </div>
    )
}

export default EditorCard
