import { useBlog } from "../hooks"
import { useParams } from 'react-router-dom';
import { FullBlog } from "../components/FullBlog";
import { Header } from "../components/Header"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blog = () => {
    const { id } = useParams()
    const {loading, blog} = useBlog({id: id||""})

    if(loading || blog===undefined){
        return <div> 
                <Header/>  
                    <div className="flex flex-col justify-center px-40">  
                        <BlogSkeleton/>   
                    </div> 
                </div>
    }

    return <div>
                <Header/>  
                <FullBlog    
                    content={blog.content}
                    title={blog.title}
                    authorName={blog.author.name}
                    publishedDate="Aug 21, 2024"
                />  
            </div>
}