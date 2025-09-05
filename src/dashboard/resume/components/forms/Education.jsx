import React, { useState, useContext, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  // ✅ Safely populate data from context
  useEffect(() => {
    if (Array.isArray(resumeInfo?.education) && resumeInfo.education.length > 0) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo?.education]);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log('Update response:', resp);
        setLoading(false);
        toast('Details updated!');
      },
      (error) => {
        console.error('Update failed:', error);
        setLoading(false);
        toast('Error, please try again!');
      }
    );
  };

  // ✅ Sync updated list to context
  useEffect(() => {
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        education: educationalList
      });
    }
  }, [educationalList]);

  return (
    <div className='p-5 rounded-lg shadow-lg border-t-4 mt-10 bg-white' style={{ borderColor: '#646cffaa' }}>
      <div className='mb-4'>
        <h2 className='font-bold text-lg'>Education Details</h2>
        <p className='text-sm text-gray-600'>Add Your Education Details</p>

        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label className='text-xs'>University Name</label>
                <input
                  name="universityName"
                  value={item.universityName}
                  onChange={(e) => handleChange(e, index)}
                  className='w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='text-xs'>Degree</label>
                <input
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(e, index)}
                  className='w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='text-xs'>Major</label>
                <input
                  name="major"
                  value={item.major}
                  onChange={(e) => handleChange(e, index)}
                  className='w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='text-xs'>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleChange(e, index)}
                  className='w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='text-xs'>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleChange(e, index)}
                  className='w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='col-span-2'>
                <label className='text-xs'>Description</label>
                <input
                  name="description"
                  value={item.description}
                  onChange={(e) => handleChange(e, index)}
                  className='w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button onClick={AddNewEducation}>+ Add More Education</Button>
            <Button onClick={RemoveEducation}>- Remove</Button>
          </div>
          <Button onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
