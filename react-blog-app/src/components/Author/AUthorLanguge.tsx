import React, { memo } from 'react'
import { useAuthor } from '../../Provider/AuthorProvider'
import EditableInputField from './EditableInputField'
import { capitalizeFirstLetter } from '../../helper/utils'
import mockAuthor from '../../static/author'

const AuthorLanguage = memo(({ languages }: { languages: string[] }) => {
  if (!languages || languages.length === 0) return null

  const { isUpdate, dispatch, state } = useAuthor()

  return (
    <>
      {isUpdate ? (
        <div>
          <h2 className="text-lg font-semibold mb-1">🌍 Languages</h2>
          <EditableInputField
            value={state.details.languages?.join(',') || ''}
            placeholder={`${mockAuthor.languages}`}
            onChange={(e) =>
              dispatch({
                type: "SET_DETAILS_LANGUAGES",
                payload: e.target.value.split(',').map(lang => lang.trim()),
              })
            }
          />
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-1">🌍 Languages</h2>
          <p>{languages.map((language)=>capitalizeFirstLetter(language)).join(",")}</p>
        </div>
      )}
    </>
  )
})

export default AuthorLanguage
