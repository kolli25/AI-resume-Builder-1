import React from 'react'

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Experience?.length > 0 ? (
        resumeInfo.Experience.map((experience, index) => (
          <div key={index}>
            <h2 className='text-sm font-bold'>{experience?.title}</h2>
            <h2 className='text-xs flex justify-between'>
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span>
                {experience?.startDate} TO{' '}
                {experience.currentlyWorking ? 'Present' : experience.endDate}
              </span>
            </h2>

            <div
              className='text-xs my-2'
              dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
            />
          </div>
        ))
      ) : (
        <p className='text-sm text-gray-500 text-center mt-4'>
          No experience added yet.
        </p>
      )}
    </div>
  )
}

export default ExperiencePreview
