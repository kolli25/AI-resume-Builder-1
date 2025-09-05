import React from 'react'

function SkillsPreview({ resumeInfo }) {
    const skillsList = resumeInfo?.skills ?? []; // fallback to empty array

    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor }}
            >
                Skills
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />

            <div className='grid grid-cols-2 gap-3 my-4'>
                {skillsList.length > 0 ? (
                    skillsList.map((skill, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-between'
                        >
                            <h2 className='text-xs'>{skill.name}</h2>
                            <div className='h-2 bg-gray-200 w-[120px]'>
                                <div
                                    className='h-2'
                                    style={{
                                        backgroundColor: resumeInfo?.themeColor,
                                        width: `${skill?.rating * 20}%`
                                    }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-sm text-gray-500 col-span-2 text-center'>
                        No skills added yet.
                    </p>
                )}
            </div>
        </div>
    )
}

export default SkillsPreview
