'use client'
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected';
import Heading from '../utills/Heading';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import Profile from "../components/Profile/Profile"

type Props = {}

const Page: FC<Props> = (props) => {
    const [open, setOpen ] = useState(false);
    const [activeItem, setActiveItem] = useState(5)
    const [route, setRoute] = useState("Login")
    const {user} = useSelector((state:any) => state.auth)
  return (
    <div>
        <Protected>
        <Heading
      title={`${user?.name} profile - ELearning`}
      description="Lms Becodemy is platform to leran and get knowledge about coding"
      keywords="Programming, nextjs, redux"
      />
      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      setRoute= {setRoute}
      route={route}
      />
      <Profile user={user}/>
        </Protected>
    </div>
  )
}

export default Page