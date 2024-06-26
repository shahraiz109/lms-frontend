import { title } from "process";
import React, {FC} from "react"

interface HeadingProps{
    title: string;
    description: string;
    keywords: string;
}

const Heading: FC<HeadingProps> = ({title, description, keywords})=>{
return(
    <>
    <title>{title}</title>
    <meta name="viewport" content="width=decice-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    </>
)
}

export default Heading;