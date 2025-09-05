import React, { useState, useContext, useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '../../../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Skills() {
  const [skillsList, setSkillsList] = useState([{ name: '', rating: 0 }]);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Load existing skills from resumeInfo on mount
  useEffect(() => {
    if (resumeInfo?.skills?.length > 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  const handleChange = (index, name, value) => {
    const updated = [...skillsList];
    updated[index][name] = value;
    setSkillsList(updated);
  };

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: '', rating: 0 }]);
  };

  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);
    const updatedSkills = skillsList.map(({ id, ...rest }) => rest);
    const data = { data: { skills: updatedSkills } };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        toast.success('Skills updated!');
        setResumeInfo({ ...resumeInfo, skills: updatedSkills }); // update context here only
        setLoading(false);
      })
      .catch((err) => {
        console.error('Save error:', err);
        toast.error('Failed to save. Try again.');
        setLoading(false);
      });
  };

  return (
    <div className="p-5 rounded-lg shadow-lg border-t-4 mt-10 bg-white" style={{ borderColor: '#646cffaa' }}>
      <div className="mb-4">
        <h2 className="font-bold text-lg">Skills</h2>
        <p className="text-sm text-gray-600">Add your top skills</p>

        <div>
          {skillsList.map((item, index) => (
            <div key={index} className="flex justify-between mb-2 border rounded-lg p-3 py-2">
              <div className="w-full">
                <label className="text-xs">Name</label>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="ml-4">
                <label className="text-xs block">Rating</label>
                <Rating
                  style={{ maxWidth: 120 }}
                  value={item.rating}
                  onChange={(v) => handleChange(index, 'rating', v)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <Button onClick={AddNewSkills}>+ Add More</Button>
            <Button onClick={RemoveSkills}>- Remove</Button>
          </div>
          <Button onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin h-4 w-4" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
