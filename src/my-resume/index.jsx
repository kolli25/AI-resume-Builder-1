import React, { useState, useEffect } from 'react';
import Header from '../components/custom/Header';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Button } from '../components/ui/button';
import { useParams } from 'react-router-dom';
import ResumePreview from '../dashboard/resume/components/ResumePreview';
import GlobalApi from '../../service/GlobalApi';
import { RWebShare } from 'react-web-share';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            🎉 Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            You can download or share this resume using the buttons below.
          </p>

          <div className="flex justify-between px-10 md:px-20 lg:px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            <RWebShare
              data={{
                text: 'Hello Everyone, This is my resume. Please open the URL to view it:',
                url: `${import.meta.env.VITE_BASE_URL.replace(/\/$/, '')}/my-resume/${resumeId}/view`,
                title:
                  resumeInfo?.firstName +
                  ' ' +
                  resumeInfo?.lastName +
                  "'s Resume",
              }}
              onClick={() => console.log('Shared successfully!')}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
