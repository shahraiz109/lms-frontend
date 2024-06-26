'use client'
import React,{FC} from 'react'
import Heading from '../../../utills/Heading'
import DashboardHeader from '../../../components/Admin/DashboardHeader'
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar"
import EditCourse from "../../../components/Admin/Course/EditCourse"


type Props = {}

const page:FC<Props> = ({params}:any) => {

    const id = params?.id
  return (
    <div>
        <Heading
        title= "Admin - ELearning"
        description="Lms Becodemy is platform to leran and get knowledge about coding"
        keywords="Programming, nextjs, redux"
        />
        <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%] w-1/5'>
             <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
             <DashboardHeader/>
             <EditCourse id={id}/>
            </div>

        </div>
    </div>
  )
}

export default page