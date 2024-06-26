import React,{FC, useState} from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { CiEdit } from "react-icons/ci";
import { title } from 'process';
import Loader from '../../Loader/Loader';
import {format} from "timeago.js"
import { useGetAllUsersQuery } from '../../../../redux/features/user/userApi';
import  {AiOutlineMail} from "react-icons/ai"
import { style } from '../../../styles/style';

type Props = {
    isTeam: boolean;
}



const AllTeams:FC<Props> = ({isTeam}) => {

    const { theme, setTheme } = useTheme();
    const {isLoading,data, error} = useGetAllUsersQuery({})
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: .5 },
        { field: "email", headerName: "Email", flex: .5},
        { field: "role", headerName: "Role", flex: .5 },
        { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
     
        {
            field: "  ", headerName: "Email", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <a
                    href={`mailto${params.row.emial}`}
                    >
                        <AiOutlineMail
                            className='dark:text-white text-black'
                            size={20}
                        />
                    </a>
                )
            }
        }

    ];

    const rows:any = [

    ]
        if(isTeam){
            const newData = data&&data.users.filter((item:any) => item.role === "user")
            newData && newData.courses.forEach((item:any) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    courses: item.courses.length,
                    created_at: format(item.createdAt)
                    })
                });
        }else{
            data && data.courses.forEach((item:any) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    courses: item.courses.length,
                    created_at: format(item.createdAt)
                    })
                });
        }

    return (
        <div className='mt-[120px]'>
            <Box m="20p">
                <div className="flex w-full justify-end">
                    <div className={`${style.button} !w-[200px]`}
                    onClick={() => setActive}
                    >
            Add new member
                    </div>

                </div>
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

export default AllTeams;
