import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
export const Header = () => {
    return  <div className="flex  justify-between border-b px-10 py-4 "> 
                <div className="flex flex-col justify-center">
                <Link to={{pathname: `/blogs`}}>
                    <div className="font-bold cursor-pointer">MEDIUM</div>                  
                </Link>
                </div>
                <div>  
                <Link to={{pathname: `/publish`}}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Create</button>
                </Link>
                <Avatar size="big" name="G"/>  
                </div>
            </div>
}