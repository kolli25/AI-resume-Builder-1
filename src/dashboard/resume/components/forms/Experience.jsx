import { useState, useEffect, useContext } from "react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "../../../../../service/GlobalApi";

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: ''
};

function Experience() {
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.Experience?.length > 0) {
      setExperienceList(resumeInfo.Experience);
    }
  }, []);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  const RemoveExperience = () => {
    setExperienceList((prev) => prev.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experienceList,
    });
  }, [experienceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        setLoading(false);
        toast("Details updated!");
      },
      (error) => {
        console.error("Update failed:", error);
        setLoading(false);
        toast("Error, please try again!");
      }
    );
  };

  return (
    <div>
      <div
        className="p-5 rounded-lg shadow-lg border-t-4 mt-10 bg-white"
        style={{ borderColor: "#646cffaa" }}
      >
        <div className="mb-4">
          <h2 className="font-bold text-lg">Professional Experience</h2>
          <p className="text-sm text-gray-600">Add Your Previous Job Experience</p>

          <div>
            {experienceList.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-3 border p-3 m-5 rounded-lg">
                  <div>
                    <label className="text-xs">Position Title</label>
                    <input
                      name="title"
                      value={item.title || ''}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs">Company Name</label>
                    <input
                      name="companyName"
                      value={item.companyName || ''}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs">City</label>
                    <input
                      name="city"
                      value={item.city || ''}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs">State</label>
                    <input
                      name="state"
                      value={item.state || ''}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={item.startDate || ''}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={item.endDate || ''}
                      onChange={(event) => handleChange(index, event)}
                      className="w-full mt-1 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <RichTextEditor
                      index={index}
                      defaultValue={item?.workSummery || ''}
                      onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button onClick={AddNewExperience}>+ Add More Experience</Button>
              <Button onClick={RemoveExperience}>- Remove</Button>
            </div>
            <Button onClick={onSave} disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
