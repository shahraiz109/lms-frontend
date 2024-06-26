import axios from 'axios';
import React,{FC, useEffect, useState} from 'react'

type Props = {
    vedioUrl: string;
    title: string;
}

const CoursePlayer:FC<Props> = ({vedioUrl}) => {

     const [vedioData, setVedioData] = useState({
        otp:"",
        playbackInfo:""
     })

     useEffect(() => {
        axios.post("http://localhost:8000/api/v1/getVdocipherOTP",{
            vedioId: vedioUrl,

        }).then((res) => {
            setVedioData(res.data)
        })
     },[vedioUrl])

  return (
    <div style={{paddingTop: "41%" , position:"relative"}}>
    {
        vedioData.otp && vedioData.playbackInfo !== "" && (
            <iframe src={`
    https://player.vdocipher.com/v2/?otp=${vedioData?.otp}&playbackInfo=${vedioData.playbackInfo}&player=e3lgWASVjvknphuz`}
     style={{border:0,
        width:"90%",
        position:"absolute",
        top:0,
        left:0,
     }}
       allowFullScreen= {true}
        allow="encrypted-media">

        </iframe>
        )
    }
    </div>
  )
}

export default CoursePlayer