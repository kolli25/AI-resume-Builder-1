import React from 'react'

function EducationalPreview({ resumeInfo }) {
  const educationList = resumeInfo?.education ?? []; // Fallback to empty array

  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {educationList.length > 0 ? (
        educationList.map((education, index) => (
          <div key={index} className='my-5'>
            <h2
              className='text-sm font-bold'
              style={{ color: resumeInfo?.themeColor }}
            >
              {education.universityName}
            </h2>
            <h2 className='text-xs flex justify-between'>
              {education?.degree} in {education?.major}
              <span>
                {education?.startDate} - {education?.endDate}
              </span>
            </h2>
            <p className='text-xs my-2'>{education?.description}</p>
          </div>
        ))
      ) : (
        <p className='text-sm text-gray-500 text-center mt-4'>
          No education details added yet.
        </p>
      )}
    </div>
  )
}

export default EducationalPreview
