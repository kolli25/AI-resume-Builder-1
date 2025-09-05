import React, { useState, useEffect, useRef, useContext } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || '');
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({ ...resumeInfo, themeColor: color });

    const data = { data: { themeColor: color } }; // Make sure this field matches your Strapi content type

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then(() => {
        toast.success('Theme color updated!');
        setOpenPopover(false);
      })
      .catch((err) => {
        console.error('Update failed:', err.response?.data || err.message);
        toast.error('Failed to update color');
      });
  };

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      <button
        onClick={() => setOpenPopover(!openPopover)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
      >
        <LayoutGrid size={16} />
        <span className="text-sm">Theme</span>
      </button>

      {openPopover && (
        <div className="absolute z-50 mt-2 right-0 w-48 p-4 bg-white rounded-md shadow-lg border border-gray-200">
          <h2 className="mb-2 text-sm font-medium text-gray-700">Select Theme Color</h2>
          <div className="grid grid-cols-5 gap-3">
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => onColorSelect(color)}
                className={`w-5 h-5 rounded-full cursor-pointer border-2 transition ${
                  selectedColor === color ? 'border-black' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeColor;
