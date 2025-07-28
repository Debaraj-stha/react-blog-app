import React from 'react'
import { FaUserTie } from 'react-icons/fa'
import { useAuthor } from '../../Provider/AuthorProvider'
import EditableInputField from './EditableInputField'
import mockAuthor from '../../static/author'
type AuthorEducationAndProfessionType = {
    education?: string,
    profession?: string,


}
const AuthorEducationAndProfession = ({ education, profession }: AuthorEducationAndProfessionType) => {
    const { state, isUpdate, dispatch } = useAuthor()

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {
                isUpdate ?
                    <div>
                        <h2 className="text-lg font-semibold mb-1 text-gray-600 dark:text-gray-100">🎓 Education</h2>
                        <EditableInputField
                            placeholder={`${mockAuthor.education}`}
                            value={state.details.education || ''}
                            onChange={(e) => dispatch({ type: "UPDATE_DETAILS_EDUCATION", payload: e.target.value })}

                        />
                    </div>
                    :
                    education && (
                        <div>
                            <h2 className="text-lg font-semibold mb-1 text-gray-600 dark:text-gray-100">🎓 Education</h2>
                            <p className='text-gray-600 dark:text-gray-100'>{education}</p>
                        </div>
                    )

            }

            {
                isUpdate ?
                    <div>
                        <h2 className="text-lg font-semibold mb-1 text-gray-600 dark:text-gray-100">💼 Profession</h2>
                        <EditableInputField
                            value={state.details.profession || ''}
                            placeholder={`${mockAuthor.profession}`}
                            onChange={(e) => dispatch({ type: "UPDATE_DETAILS_PROFESSION", payload: e.target.value })}

                        />
                    </div>
                    :
                    profession && (
                        <div>
                            <h2 className="text-lg font-semibold mb-1">💼 Profession</h2>
                            <p className='text-gray-600 dark:text-gray-100'><FaUserTie className="inline-block mr-2" />{profession}</p>
                        </div>
                    )}

        </div>
    )
}

export default AuthorEducationAndProfession
