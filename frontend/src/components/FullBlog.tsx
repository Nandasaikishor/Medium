import { Avatar } from "./BlogCard"


interface FullBlogInterface {
    authorName:string;
    title:string;
    content:string;
    publishedDate: string;
}

export const FullBlog = ({authorName, title, content, publishedDate}: FullBlogInterface) => {
    return <div className="flex justify-center"> 
    <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">    
            <div className="col-span-8">
                    <div className="text-5xl font-bold">
                        {title}
                    </div>
                    <div className="py-2">
                        {`Posted on ${publishedDate}`}
                    </div>
                    <div className="text-gray-500">
                        {content}
                    </div>
                </div> 
                <div className="col-span-4">
                    <div className="pb-3 font-semibold text-gray-500">
                        {`Author`}
                    </div> 
                    <div className="flex items-center">
                            <div>
                            <Avatar size="small" name={authorName || "Anonymous"}/>   
                            </div>
                            <div className="pl-3">
                                <div className="text-xl font-bold">{authorName || "Anonymous"}</div>
                                <div className="test-slate-00">{"some catchy phrase obout author intersets and identity"}</div>
                            </div>  
                    </div>
                </div>
            </div>
    </div>

}