import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@nandasaikishor/medium-common'

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
        userID: string
    }
  }>()

blogRouter.use('/*',async (c, next) => {
    const authHeader = c.req.header("authorization") || "";

    const user = await verify(authHeader, c.env.JWT_SECRET)

    console.log("user")
    console.log(user)

    if(user) {
        c.set("userID", user.id as string);
        await next();
    }else{
        c.status(411);
        return c.json({
            message: "user not authorized"
        })
    }

})

blogRouter.get('getBlog/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const id = await c.req.param("id");
    try{
        const blog = await prisma.post.findFirst({
            where : {
                id: id
            }, 
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                   select: {
                       name: true
                   }
                }
           }
        })
        return c.json({
            blog
        })
    }catch (e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        });
    } 
})

blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
        log: ['query', 'info', 'warn', 'error']
    }).$extends(withAccelerate()); 

    try {
        const blogs = await prisma.post.findMany({
            select: {
                 id: true,
                 title: true,
                 content: true,
                 author: {
                    select: {
                        name: true
                    }
                 }
            }
        });
        console.log("blogs------>", blogs)

        return c.json({
            blogs
        })
    } catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog posts"
        });
    } 
})  

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json(); 
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    
    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
         })

        return c.json({
            id: blog.id
        })
    } catch (e){
        c.status(411);
        return c.json({
            message: "Error while updating the blog"
        });
    } 
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userID")
            }
         })
     
        return c.json({
            id: blog.id
        })
    } catch (e){
        c.status(411);
        return c.json({
            message: "Error while posting the blog"
        })
    } 
})