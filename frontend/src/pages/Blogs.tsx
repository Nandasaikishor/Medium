import { BlogCard } from "../components/BlogCard"
import { Header } from "../components/Header"
import { useBlogs } from "../hooks"
import {BlogsSkeleton} from "../components/BlogsSkeleton"


export const Blogs = () => { 
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <Header/>
            <div  className="flex justify-center">
                <div>
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
            <Header/>
                <div className="flex justify-center">
                    <div className="max-w-xl min-w-96">
                        { 
                            blogs.map((blog) => 
                                <BlogCard
                                    id={blog.id}
                                    content={blog.content}
                                    title={blog.title}
                                    authorName={blog.author.name}
                                    publishedDate="2-21-24"
                                />
                            )
                        }
                    </div>
                </div> 
            </div>
}