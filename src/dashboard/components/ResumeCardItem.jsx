import React, { useState, useEffect, useRef } from 'react';
import {
  MoreVertical, Pencil, Eye, Download, Trash2, X, Loader2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    setDeleting(true);
    GlobalApi.DeleteResumeById(resume.id)
      .then(() => {
        toast.success('Resume Deleted!');
        setShowAlert(false);
        setDeleting(false);
        refreshData(); // Refresh parent list
      })
      .catch((err) => {
        console.error("Delete failed:", err.response?.data || err.message);
        toast.error('Failed to delete.');
        setDeleting(false);
      });
  };

  return (
    <>
      <div className="w-full max-w-[230px] transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl overflow-visible flex flex-col justify-between">
        <Link to={`/dashboard/resume/${resume.id}/edit`}>
          <div
            className="h-[190px] bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 
              flex items-center justify-center rounded-t-xl border-2"
            style={{ borderColor: resume?.themeColor }}
          >
            <img src="/cv.png" width={70} height={70} alt="Resume" />
          </div>
        </Link>

        <div
          className="bg-red-500 text-white px-4 py-4 flex items-center justify-between rounded-b-xl"
          style={{ minHeight: '75px' }}
        >
          <h2 className="text-sm font-semibold truncate w-[150px]">
            {resume.title || 'Untitled'}
          </h2>

          <div className="relative z-30" ref={dropdownRef}>
            <MoreVertical
              className="h-5 w-5 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 top-8 w-40 bg-white text-black shadow-xl rounded-md z-50">
                <div
                  onClick={() => navigate(`/dashboard/resume/${resume.id}/edit`)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                >
                  <Pencil size={16} />
                  Edit
                </div>
                <div
                  onClick={() => navigate(`/my-resume/${resume.id}/view`)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                >
                  <Eye size={16} />
                  View
                </div>
                <div
                  onClick={() => navigate(`/my-resume/${resume.id}/view`)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </div>
                <div
                  onClick={() => {
                    setShowAlert(true);
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Are you absolutely sure?</h2>
              <X className="h-5 w-5 cursor-pointer" onClick={() => setShowAlert(false)} />
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              This action cannot be undone. It will permanently delete your resume and remove it from our servers.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                onClick={() => setShowAlert(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2 text-sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResumeCardItem;
