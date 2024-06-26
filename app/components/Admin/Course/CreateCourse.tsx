'use client'
import React, { useEffect, useState } from 'react'
import CourseInformation from "./CourseInformation"
import CourseData from "./CourseData"
import Courseoptions from "./Courseoptions"
import CourseContent from "./CourseContent"
import CoursePreview from "./CoursePreview"
import { useCreateCourseMutation } from '../../../../redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

type Props = {}

const CreateCourse = (props: Props) => {

    const [createCourse,{isLoading,isSuccess,error}] = useCreateCourseMutation();

     useEffect(() => {
        if(isSuccess){
            toast.success("coursecreated successfully")
            redirect("/admin/courses")
        }
        if(error){
            if("data" in error){
                const errorMessaage = error as any;
                toast.error(errorMessaage.data.message)
            }
        }
     },[isLoading,isSuccess,error])

    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    })
    const [benifits, setBenifits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])
    const [courseContentData, setCourseContentData] = useState([
        {
            vedioUrl: "",
            title: "",
            description: "",
            vedioSection: "United Section",
            links: [
                {
                    title: "",
                    url: "",
                }
            ],
            suggession: "",
        }

    ])
   const [courseData, setCourseData] = useState({})

   const handleSubmit = async() => {
            // formate benifits aarray

            const formatedBenifits = benifits.map((benifit) => ({title:benifit.title}))

            // formate prerequisites

            const formatedPrerequisites = prerequisites.map((prerequisite) => ({title:prerequisite.title}))

            // formate course content array

            const formatedCourseContent = courseContentData.map((CourseContent)=> ({
                vedioUrl: CourseContent.vedioUrl,
                title: CourseContent.title,
                description: CourseContent.description,
                vedioSection: CourseContent.vedioSection,
                links: CourseContent.links.map((link) => ({
                    title: link.title,
                    url: link.url,
                })),
                suggestion: CourseContent.suggession
            }))

            // prepare data object

            const data = {
                name: courseInfo.name,
                description: courseInfo.description,
                price: courseInfo.price,
                estimatedPrice: courseInfo.estimatedPrice,
                tags: courseInfo.tags,
                thumbnail: courseInfo.thumbnail,
                level: courseInfo.level,
                demoUrl: courseInfo.demoUrl,
                totalVedios: courseContentData.length,
                benifits: formatedBenifits,
                prerequisites: formatedPrerequisites,
                courseData: formatedCourseContent
            }
            setCourseData(data)
            
   }

   const handleCourseCreate = async(e:any) => {
       const data = courseData;

     if(!isLoading){
        await createCourse(data)
     }
   }

    return (
        <div className='w-full flex min-h-screen'>
            <div className='w-[80%]'>
              {
                active === 0 && (
                    <CourseInformation
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    active={active}
                    setActive={setActive}
                    />
                )
              }
                {
                active === 1 && (
                    <CourseData
                    benefits={benifits}
                    setBenefits={setBenifits}
                    prerequisites={prerequisites}
                    setPrerequisites={setPrerequisites}
                    active={active}
                    setActive={setActive}
                    />
                )
              }
               {
                active === 2 && (
                    <CourseContent
                    active={active}
                    setActive={setActive}
                    courseContentData={courseContentData}
                    setCourseContentData={setCourseContentData}
                    handleSubmit={handleSubmit}
                    />
                )
              }
               {
                active === 3 && (
                    <CoursePreview
                    active={active}
                    setActive={setActive}
                    courseData={courseData}
                    handleCourseCreate={handleCourseCreate}
                    />
                )
              }
            </div>
            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
            <Courseoptions active={active} setActive={setActive} />
            </div>

        </div>
    )
}

export default CreateCourse