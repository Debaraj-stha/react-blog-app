import React, { memo } from 'react'
import { FaCode } from 'react-icons/fa'
import { useAuthor } from '../../Provider/AuthorProvider'
import EditableInputField from './EditableInputField'
import mockAuthor from '../../static/author'
type AuthorSkillsAndHobbiesProps = {
    hobbies?: string[] | undefined
    skills?: string[] | undefined
}
const AuthorSkillsAndHobbies = memo(({ hobbies, skills }: AuthorSkillsAndHobbiesProps) => {
    const { isUpdate, state, dispatch } = useAuthor()
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {
                isUpdate ?
                    <div>
                        <h2 className="text-lg font-semibold mb-1 text-gray-600 dark:text-gray-100">🎯 Hobbies</h2>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-100">
                            <EditableInputField
                                value={state.details.hobbies?.join(',') || ''}

                                onChange={(e) =>
                                    dispatch({
                                        type: "SET_DETAILS_HOBBIES",
                                        payload: e.target.value.split(',').map(hobby => hobby.trim()),
                                    })
                                }
                                placeholder={`${mockAuthor.hobbies}`}
                            />
                        </ul>
                    </div>
                    :
                    hobbies?.length! > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-1 text-gray-600 dark:text-gray-100">🎯 Hobbies</h2>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-100">
                                {hobbies!.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        </div>
                    )
            }
            {
                isUpdate ?
                    <div>
                        <h2 className="text-lg font-semibold mb-1 text-gray-600 dark:text-gray-100">🛠 Skills</h2>
                        <EditableInputField
                            value={state.details.skills?.join(',') || ''}

                            onChange={(e) =>
                                dispatch({
                                    type: "SET_DETAILS_SKILLS",
                                    payload: e.target.value.split(',').map(skill => skill.trim()),
                                })
                            }
                            placeholder={`${mockAuthor.skills}`}
                        />
                    </div>
                    :
                    skills?.length! > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-1 text-gray-600 dark:text-gray-100">🛠 Skills</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skills!.map((skill, i) => (
                                    <span key={i} className="bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-black px-3 py-1 rounded-full text-sm ">
                                        <FaCode className="inline mr-1" />{skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
            }

        </div>
    )
})

export default AuthorSkillsAndHobbies
