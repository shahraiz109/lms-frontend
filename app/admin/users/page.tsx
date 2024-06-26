'use client'
import React from 'react'
import Heading from "../../utills/Heading"
import AdminSidebar from "../../../app/components/Admin/Sidebar/AdminSidebar"
import DashboardHero from "../../components/Admin/DashboardHero"
import  AllUsers from "../../components/Admin/Users/AllUsers"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
        title= "Admin - ELearning"
        description="Lms Becodemy is platform to leran and get knowledge about coding"
        keywords="Programming, nextjs, redux"
        />
        <div className='flex h-screen'>
            <div className='1500px:w-[16%] w-1/5'>
             <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
             <DashboardHero/>
             <AllUsers/>
            </div>

        </div>
    </div>
  )
}

export default page