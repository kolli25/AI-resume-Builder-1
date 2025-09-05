import React, { useState } from 'react'
import { Loader2, PlusSquare } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import GlobalApi from '../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const AddResume = () => {
  const [open, setOpen] = useState(false)
  const [resumeName, setResumeName] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useUser()
  const navigation = useNavigate()

  const onCreate = async () => {
  setLoading(true)
  const uuid = uuidv4();
  const data = {
    data: {
      title: resumeName,
      resumeId: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName
    }
  }

    GlobalApi.CreateNewResume(data).then(resp => {
        console.log(resp.data.data.documentId);
        if (resp) {
          setLoading(false)
          setOpen(false)
          setResumeName('')
          navigation('/dashboard/resume/'+ resp.data.data.documentId+ "/edit");// ✅ Correct navigation
        }
      },(error) => {
        setLoading(false)
      })
  }

  return (
    <div>
      {/* Trigger box */}
      <div
        onClick={() => setOpen(true)}
        className="p-14 py-24 border border-blue-500 items-center flex justify-center bg-secondary rounded-lg h-[240px]
        hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed bg-slate-200 mt-14"
      >
        <PlusSquare />
      </div>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Dialog content */}
            <h2 className="text-xl font-semibold mb-2">Create New Resume</h2>
            <p className="text-gray-600 text-sm mb-4">
              You can start creating your resume here.
            </p>

            {/* Input field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Create Title for Your New Resume
              </label>
              <input
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder="ex: Full Stack Resume"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onCreate}
                disabled={!resumeName.trim() || loading}
                className={`px-4 py-2 rounded-md text-white transition-colors ${
                  resumeName.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddResume  