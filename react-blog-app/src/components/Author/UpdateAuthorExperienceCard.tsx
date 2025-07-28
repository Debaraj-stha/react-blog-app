import React from 'react'
import { useAuthor } from '../../Provider/AuthorProvider'
import EditableInputField from './EditableInputField'
import type { Experience } from '../../types/author'
import { CgAdd } from 'react-icons/cg'
import mockAuthor from '../../static/author'

const UpdateAuthorExperienceCard = () => {
  const { isUpdate, state, dispatch } = useAuthor()
  const experience = state.details?.experience || []
  const handleChange = (index: number, field: keyof Experience, value: string) => {
    dispatch({ type: "UPDATE_DETAILS_EXPERIENCE", payload: { index, field, value } })
  }
  const handleAddExperience = () => {
    dispatch({ type: "SET_DETAILS_EXPERIENCE", payload: [...experience,{ company: '', role: '', duration: '' }] })
  }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-100">🏢 Experience</h2>
      <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experience.map((exp, idx) => (
          <li key={idx} className="border-l-4 border-blue-500 pl-3">
            {
              isUpdate ? (
                <>
                  <EditableInputField
                    value={state.details.experience?.[idx]?.role || ''}
                    placeholder={`${mockAuthor.experience[0].role}`}
                    onChange={(e) => handleChange(idx, 'role', e.target.value)}
                    extraClass="text-base font-semibold text-black dark:text-white"
                  />
                  <EditableInputField
                    value={state.details.experience?.[idx]?.company || ''}
                      placeholder={`${mockAuthor.experience[0].company}`}
                    onChange={(e) => handleChange(idx, 'company', e.target.value)}
                    extraClass="text-base text-black dark:text-white"
                  />
                  <EditableInputField
                    value={state.details.experience?.[idx]?.duration || ''}
                     placeholder={`${mockAuthor.experience[0].duration}`}
                    onChange={(e) => handleChange(idx, 'duration', e.target.value)}
                    extraClass="text-sm text-gray-500 dark:text-gray-200"
                  />
                </>
              ) : (
                <>
                  <p className="font-medium">{exp.role} @ {exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-100">{exp.duration}</p>
                </>
              )
            }

          </li>
        ))
        }
      </ul >
      {
        isUpdate && (
          <button
            type="button"
            onClick={handleAddExperience}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
           <CgAdd/>
          </button>
        )
      }
    </div >
  )
}

export default UpdateAuthorExperienceCard
