'use client'
import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { style } from '../../styles/style'
import { Email, Spa } from '@mui/icons-material'
import { useLoginMutation } from '../../../redux/features/auth/authApi'
import toast from 'react-hot-toast'
import {signIn} from "next-auth/react"


type Props = {
    setRoute: (route: string) => void
    setOpen: (open: boolean) => void

}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid emial").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6)
})

const Login: FC<Props> = ({setRoute,setOpen}) => {

    const [show, setShow] = useState(false);
    const [login,{isSuccess,error}] = useLoginMutation();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
        await login({email, password})
        }
    });

         useEffect(() => {
            if(isSuccess){
                toast.success("Login successfully"),
                setOpen(false)
            }
            if(error){
                if("data" in error){
                    const errorData = error as any;
                    toast.error(errorData.data.message);
                    
                }
            }
         },[isSuccess,error])

    const { errors, touched, values, handleChange, handleSubmit } = formik;


    return (
        <div className="w-full">
            <h1 className={`${style.title}`}>
                Login with ELearning
            </h1>
            <form onSubmit={handleSubmit}>
                <label className={`${style.lable}`} htmlFor="email">
                    Enter your Email
                </label>
                <input type="email"
                    name=''
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder='loginmail@gmail.com'
                    className={`${errors.email && touched.email && "border-red-500"} ${style.input}`}
                />
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}
                <div className="relative mt-5 w-full mb-1">
                    <label className={`${style.lable}`} htmlFor="password">Enter you password</label>
                    <input type={!show ? "password" : "text"}
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    placeholder='password!@%'
                    className={`${errors.password && touched.password && "border-red-500"} ${style.input}`}
                />
                {!show ? (
                    <AiOutlineEyeInvisible
                    className="absolute bottom-3 right-2 z-10 cursor-pointer"
                    size={20}
                    onClick={() => setShow(true)}
                    />
                ):(
                    <AiOutlineEye
                    className="absolute bottom-3 right-2 z-10 cursor-pointer"
                    size={20}
                    onClick={() => setShow(false)}
                    />
                )}
                {errors.password && touched.password && (
                    <span className='text-red-500 pt-2 block'>{errors.password}</span>
                )}
                </div>
                <div className="w-full mt-5">
              <input type="submit" 
                value="Login"
                className={`${style.button}`}
              />
                </div>
                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Or join with
                </h5>
                <div className="flex items-center justify-center my-3">
             <FcGoogle size={30} className="cursor-pointer mr-2"
             onClick={()=>  signIn("google")}
             />
             <AiFillGithub size={30} className="cursor-pointer ml-2"
             onClick={()=>  signIn("github")}
             />

                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Not have an account?{""}
            <span className="text-blue-500 pl-1 cursor-pointer"
            onClick={()=> setRoute("Sign-Up")}
            >
                Sign Up
            </span>
                </h5>
            </form>
        </div>
    )
}

export default Login