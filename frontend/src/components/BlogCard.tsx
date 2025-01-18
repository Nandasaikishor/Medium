import { Link } from "react-router-dom";

export interface BlogCardInputs {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;

}

// export const BlogCard = ({id, authorName, title, content, publishedDate, }: BlogCardInputs) => {
//     return <Link to={{pathname: `/blog/${id}`}}>
//     <div className="border-b border-slate-200 p-4 cursor-pointer">
//         <div className="flex">
//             <Avatar name={authorName}/>
//             <div className=" text-sm flex flex-col justify-center font-extralight pl-2">
//                 {authorName}
//             </div>
//             <div className="flex flex-col  pl-2">
//             <Circle/>
//             </div>
//             <div className=" text-sm flex flex-col justify-center pl-2 text-slate-500 font-thin">
//                 {publishedDate}
//             </div>
//         </div>
//         <div className="text-xl font-semibold pt-3">{title}</div>
//         <div className="text-md font-thin">{`${content.slice(0,100)} ...`}</div>
//         <div className=" text-slate-400 text-sm pt-4">
//             {`${Math.floor(content.length/100)} Minute(s) read`}
//         </div>
//     </div>
//     </Link>
// }

export const BlogCard = ({id, authorName, title, content, publishedDate, }: BlogCardInputs) => {
    return <Link to={{pathname: `/blog/${id}`}}>
    <div className="border-b border-slate-200 p-4 cursor-pointer">
        <div className="flex items-center	">
            <Avatar name={authorName}/>
            <div className="text-sm font-extralight pl-2">
                {authorName}
            </div>
            <div className="pl-2">
            <Circle/>
            </div>
            <div className="text-sm pl-2 text-slate-500 font-thin">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-3">{title}</div>
        <div className="text-md font-thin">{`${content.slice(0,100)} ...`}</div>
        <div className=" text-slate-400 text-sm pt-4">
            {`${Math.floor(content.length/100)} Minute(s) read`}
        </div>
    </div>
    </Link>
}

export function Avatar({name, size="small"}: {name: string; size?: "small" | "big"}) {
    return <div className={`relative inline-flex items-center justify-center ${size==="small"? "w-6 h-6" :"w-10 h-10"} overflow-hidden bg-gray-300 rounded-full`}>
        <span className={`${size==="small"? "text-xs": "text-md"} font-medium text-gray-600 `}>{name[0]}</span>
    </div>
    
}

function Circle() {
    return <div className="w-1 h-1 rounded-full bg-slate-500"></div>
}