import React, { useContext } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import EducationalPreview from "./preview/EducationalPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SkillsPreview from "./preview/SkillsPreview";
import SummeryPreview from "./preview/SummeryPreview";




function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
      borderColor:resumeInfo?.themeColor
    }}>
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
       <SummeryPreview resumeInfo={resumeInfo}/>
      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo}/>
      {/* Education */}
      <EducationalPreview resumeInfo={resumeInfo}/>

      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  );
}

export default ResumePreview;
