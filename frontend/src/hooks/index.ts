import {useEffect, useState} from 'react'
import { BACKEND_URL } from '../config';
import axios, {AxiosResponse} from 'axios';

interface BlogInterface { 
        id: string;
        title: string;
        content: string;
        author: {
            name: string;
        }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [blogs, setBlogs] = useState<BlogInterface[]>([])


    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then((result: AxiosResponse<{ blogs: BlogInterface[] }>) => { 
              setBlogs(result.data.blogs);
              setLoading(false);
        })
    },[])

    return {loading, blogs}
}

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [blog, setBlog] = useState<BlogInterface>()


    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/getBlog/${id}`,{
            headers: {
                'authorization': localStorage.getItem("token")
            }
        })
        .then((result: AxiosResponse<{blog: BlogInterface}  >) => { 
              setBlog(result.data.blog);
              setLoading(false);
        })
    },[id])

    return {loading, blog}
}