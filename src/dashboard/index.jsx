import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'

const Dashboard = () => {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      GetResumesList()
    }
  }, [user])

  const GetResumesList = () => {
    setLoading(true)
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  // Skeleton Placeholder
  const SkeletonCard = () => (
    <div className="h-[280px] bg-gray-200 animate-pulse rounded-lg mb-4"></div>
  )

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Building your Resume with AI</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))}
        
      </div>
    </div>
  )
}

export default Dashboard
