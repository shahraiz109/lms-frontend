import React, { FC, useState } from 'react'
import { ThemeSwitcher } from '../../utills/ThemeSwitcher'
import { IoMdNotificationsOutline } from "react-icons/io"

type Props = {

}

const DashboardHeader: FC<Props> = (props: Props) => {

    const [open, setOpen] = useState(false)

    return (
        <div className='w-full flex items-center justify-end p-6 fixed top-5 right-0'>
            <ThemeSwitcher />
            <div className="relative cursor-pointer m-2"
                onClick={() => setOpen(!open)}
            >
                <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
                <span className='absolute -top-2 right-1 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                    3
                </span>
            </div>
            {
                open && (
                    <div className='w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-lg absolute top-16 z-10 rounded'>
                        <h5 className='text-center text-[20px] font-Poppins text-black dark:text-white p-3'>
                            Notifications
                        </h5>
                        <div className='dark:bg-gray-700 bg-black font-Poppins border-b dark:border-b-gray-600 border-b-black'>
                            <div className='flex items-center justify-center p-2'>
                                <p className='text-black dark:text-white'>
                                    New Questions Recieved
                                </p>
                                <p className='pl-5 text-black dark:text-white cursor-pointer'>
                                    Mark as read
                                </p>
                            </div>
                            <p className='px-2 text-black dark:text-white'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                 Animi, laborum optio. Minus nemo distinctio consequatur
                                  quos laboriosam laudantium corporis omnis!
                            </p>
                            <p className='p-2 text-black dark:text-white text-[14px]'>
                                5 days ago
                            </p>
                        </div>
                        <div className='dark:bg-gray-700 bg-black font-Poppins border-b dark:border-b-gray-600 border-b-black'>
                            <div className='flex items-center justify-center p-2'>
                                <p className='text-black dark:text-white'>
                                    New Questions Recieved
                                </p>
                                <p className='pl-5 text-black dark:text-white cursor-pointer'>
                                    Mark as read
                                </p>
                            </div>
                            <p className='px-2 text-black dark:text-white'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                 Animi, laborum optio. Minus nemo distinctio consequatur
                                  quos laboriosam laudantium corporis omnis!
                            </p>
                            <p className='p-2 text-black dark:text-white text-[14px]'>
                                5 days ago
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DashboardHeader