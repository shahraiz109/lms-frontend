import React, { useState } from 'react'
import { style } from '../../../styles/style';
import { read } from 'fs';

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation = ({ courseInfo, setCourseInfo, active, setActive }) => {

    const [dragging, setDragging] = useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e:any) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (e:any) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e:any) => {
        e.preventDefault()
        setDragging(false)

        const file = e.dataTransfer.files?.[0]

       if(file){
        const reader = new FileReader()

        reader.onload = () => {
            setCourseInfo({ ...courseInfo, thumbnail: reader.result })

        }
        reader.readAsDataURL(file)
       }

    } 

    return (

        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} className={`${style.lable}`}>
                <div>
                    <label htmlFor="">
                        Course Name
                    </label>
                    <input type="name"
                        name=""
                        required
                        value={courseInfo.name}
                        onChange={(e: any) => {
                            setCourseInfo({ ...courseInfo, name: e.target.value })
                        }}
                        id='name'
                        placeholder='Mern Stack with Next 13'
                        className={`${style.input}`}
                    />
                </div>
                <br />
                <div className='mb-5'>
                    <label htmlFor="" className={`${style.lable}`}>
                        Course Description:
                    </label>
                    <textarea name="" id="" cols={30} rows={8}
                        placeholder='write something amazing...'
                        className={`${style.input} !h-min py-2`}
                        value={courseInfo.description}
                        onChange={(e: any) => {
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }}
                    >
                    </textarea>
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${style.lable}`}>
                            Course Price
                        </label>
                        <input type="number"
                            name=""
                            required
                            value={courseInfo.price}
                            onChange={(e: any) => {
                                setCourseInfo({ ...courseInfo, price: e.target.value })
                            }}
                            id='price'
                            placeholder='enter price'
                            className={`${style.input}`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="" className={`${style.lable} w-[50%]`}>
                            Estimated Price (optional)
                        </label>
                        <input type="number"
                            name=""
                            // required
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) => {
                                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                            }}
                            id='price'
                            placeholder='enter estimated price'
                            className={`${style.input}`}
                        />
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="">
                        Course tags:
                    </label>
                    <input type="text"
                        name=""
                        required
                        value={courseInfo.tags}
                        onChange={(e: any) => {
                            setCourseInfo({ ...courseInfo, tags: e.target.value })
                        }}
                        id='tags'
                        placeholder='Mern Stack, Next 13, Javascript, LMS'
                        className={`${style.input}`}
                    />
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${style.lable}`}>
                            Course Level
                        </label>
                        <input type="text"
                            name=""
                            required
                            value={courseInfo.level}
                            onChange={(e: any) => {
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }}
                            id='level'
                            placeholder='Beginner/Intermediate/Expert'
                            className={`${style.input}`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="" className={`${style.lable} w-[50%]`}>
                            Demo Url
                        </label>
                        <input type="text"
                            name=""
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) => {
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }}
                            id='demoUrl'
                            placeholder='http://localhost:3000'
                            className={`${style.input}`}
                        />
                    </div>
                </div>
                <br />
                <div className='w-full'>
                    <input
                        type="file"
                        accept='image/*'
                        id='file'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file"
                    className={`w-full min-h-[10vh] dark:border-white border-black p-3 flex border items-center justify-center
                    ${dragging ? "bg-blue-500" : "bg-transparent"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    >
                    {
                        courseInfo.thumbnail ? (

                            <img src={courseInfo.thumbnail} 
                            alt=""
                            className='max-h-full w-full object-cover'
                            />

                        ) : (
                         <span>
                            Drag and drop your thumbnail here or click to browser
                         </span>
                        )
                    }
                    </label>
                </div>
                <br/>
                <div className="w-full flex item-center justify-end">
                <input type="submit"
                value="Next"
                className='w-full 800px:w-[180px] h-[40px] bg-blue-500 text-center text-white rounded mt-8 cursor-pointer'
                />
                </div>
            </form>
        </div>
    )
}

export default CourseInformation