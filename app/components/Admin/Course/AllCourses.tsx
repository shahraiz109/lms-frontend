import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { CiEdit } from "react-icons/ci";
import { useDeleteCoursesMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import { title } from 'process';
import Loader from '../../Loader/Loader';
import {format} from "timeago.js"
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {}



const AllCourses = (props: Props) => {

    const { theme, setTheme } = useTheme();
    const {isLoading,data,refetch} = useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true})
    const [deleteCourses,{isSuccess,error}] = useDeleteCoursesMutation()
    const [open, setOpen] = useState(false)
    const [courseId, setCourseId] = useState()

    useEffect(() => {
      if(isSuccess){
        setOpen(false)
        refetch()
        toast.success("course deleted successfully")
      }
      if(error){
        if("data" in error){
          const errorMsg = error as any;
          toast.error(errorMsg.data.message)
        }
      }
    },[isSuccess, error, refetch])

    const handleDelete = async() => {
      const id = courseId;
      await deleteCourses(id)
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "title", headerName: "Course Title", flex: 1 },
        { field: "ratings", headerName: "Ratings", flex: .5},
        { field: "purchased", headerName: "Purchased", flex: .5 },
        { field: "created_at", headerName: "Created At", flex: 0.5 },
        {
            field: "edit", headerName: "Edit", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <Button>
                      <Link href={`/admin/edit-course/${params.row.id}`}>
                        <CiEdit
                            className='dark:text-white text-black'
                            size={20}
                        />
                        </Link>
                    </Button>
                )
            }
        },
        {
            field: "delete", headerName: "Delete", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <Button
                    onClick={() => { setOpen(!open);
                      setCourseId(params.row.id)
                    }}
                    >
                        <AiOutlineDelete
                            className='dark:text-white text-black'
                            size={20}
                        />
                    </Button>
                )
            }
        }

    ];

    const rows:any = [

    ]
         {
            data && data.courses.forEach((item:any) => {
            rows.push({
                id: item._id,
                title: item.name,
                ratings: item.ratings,
                purchased: item.purchased,
                created_at: format(item.createdAt)
                })
            });
        }

    return (
        <div className='mt-[120px]'>
            <Box m="20p">
          {
            isLoading ? (
                <Loader/>
            ) : (
                <Box
                m="40px 0 0 0"
                height="80vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                    outline: "none",
                  },
                  "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-row": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderBottom:
                      theme === "dark"
                        ? "1px solid #ffffff30!important"
                        : "1px solid #ccc!important",
                  },
                  "& .MuiTablePagination-root": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none!important",
                  },
                  "& .name-column--cell": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                    borderBottom: "none",
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderTop: "none",
                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  },
                  "& .MuiCheckbox-root": {
                    color:
                      theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#fff !important`,
                  },
                }}
              >
                <DataGrid checkboxSelection rows={rows} columns={columns}/>
              </Box>
            )
          }

            </Box>
            
        </div>
    )
} 

export default AllCourses;
