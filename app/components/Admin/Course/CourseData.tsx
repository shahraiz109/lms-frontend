import React, { FC } from 'react'
import { style } from '../../../styles/style';
import { title } from 'process';
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import toast from 'react-hot-toast';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benifits: { title: string }[]) => void
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void
    active: number;
    setActive: (active: number) => void
}

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
      };
    
      const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
      };

          const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setBenefits(updatedPrerequisites);
      };
    
      const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
      };

      const prevButton = () => {
        setActive(active -1);
      }

      const handelOption = () => {
        if(benefits[benefits.length - 1]?.title !=="" && prerequisites[prerequisites.length - 1]?.title !==""){
          setActive(active + 1)
        }else{
          toast.error("please fill the empty fields to move next!")
        }
      }

    return (
        <div className='w-[80%] m-auto mt-24 block'>
        <div>
        <label className={`${style.lable} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${style.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "25px" }}
          onClick={handleAddBenefit}
          className="dark:bg-white rounded-full h-[25px] w-[25px]"
        />
        </div>

        <div>
        <label className={`${style.lable} text-[20px]`} htmlFor="email">
          What are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequisites"
            placeholder="You will be able to know about LMS..."
            required
            className={`${style.input} my-2`}
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "25px" }}
          onClick={handleAddPrerequisites}
          className="dark:bg-white rounded-full h-[25px] w-[25px]"
        />
        </div>
      <div className='w-full flex items-center justify-between'>
        <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-gray-900 dark:bg-blue-500 text-center text-white rounded mt-8 cursor-pointer'
        onClick={() => prevButton()}
        >
          Prev
        </div>
        <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] dark:bg-blue-500 bg-gray-900 text-center text-white rounded mt-8 cursor-pointer'
        onClick={() => handelOption()}
        >
          Next
        </div>
      </div>
   </div>
    )
}

export default CourseData