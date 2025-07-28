import React, { memo } from 'react'

type Experience = {
  company: string
  role: string
  duration: string
}

const AuthorExperience = memo(({ experience }: { experience?: Experience[] }) => {
  if (!experience || experience.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">🏢 Experience</h2>
      <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {experience.map((exp, idx) => (
          <li key={idx} className="border-l-4 border-blue-500 pl-3">
            <p className="font-medium">{exp.role} @ {exp.company}</p>
            <p className="text-sm text-gray-500 dark:text-gray-100">{exp.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default AuthorExperience
