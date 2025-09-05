import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { Button } from '../../../../components/ui/button'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function PersonalDetail({ enabledNext }) {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || '',
      })
    }
  }, [resumeInfo])

  const handleInputChange = (e) => {
    enabledNext(false)
    const { name, value } = e.target

    const updatedData = {
      ...formData,
      [name]: value,
    }

    setFormData(updatedData)
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    })
  }

  const onSave = (e) => {
    e.preventDefault()
    if (!params?.resumeId) {
      toast.error("Resume ID not found")
      return
    }

    setLoading(true)
    const data = { data: formData }

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then((resp) => {
        console.log(resp)
        toast.success('Details updated')
        enabledNext(true)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to update details')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='p-5 rounded-lg shadow-lg border-t-4 mt-10 bg-white' style={{ borderColor: '#646cffaa' }}>
      {/* Top Section */}
      <div className='mb-4'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p className='text-sm text-gray-600'>Get started with the basic information</p>
      </div>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='text-sm font-medium'>First Name</label>
            <input
              name='firstName'
              value={formData.firstName || ''}
              required
              onChange={handleInputChange}
              className='w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Last Name</label>
            <input
              name='lastName'
              value={formData.lastName || ''}
              required
              onChange={handleInputChange}
              className='w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm font-medium'>Job Title</label>
            <input
              name='jobTitle'
              value={formData.jobTitle || ''}
              required
              onChange={handleInputChange}
              className='w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm font-medium'>Address</label>
            <input
              name='address'
              value={formData.address || ''}
              required
              onChange={handleInputChange}
              className='w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Phone</label>
            <input
              name='phone'
              value={formData.phone || ''}
              required
              onChange={handleInputChange}
              className='w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Email</label>
            <input
              name='email'
              value={formData.email || ''}
              required
              onChange={handleInputChange}
              className='w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div className='mt-5 flex justify-end'>
          <Button type='submit' disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail
