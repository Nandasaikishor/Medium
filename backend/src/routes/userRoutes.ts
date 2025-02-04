import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

import { signupInput, signinInput } from '@nandasaikishor/medium-common'

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const {success, error} = signupInput.safeParse(body)
    console.log(body,error)

    if(!success){
        c.status(401);
        return c.json({
            message: "input incorrect"
        })
    } 
try{
    const user = await prisma.user.create({
        data: {
        name: body.name,
        email: body.username,
        password: body.password
        }
    }) 

    const token = await sign({'id':user.id}, c.env.JWT_SECRET)
    return c.text(token) 
} catch(e){
    console.log(e)
    c.status(401);
    return c.text("wrong creds")
}  
})
  

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success} = signinInput.safeParse(body)

    if(!success){
        c.status(401);
        return c.json({
            message: "input incorrect"
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.username,
                password: body.password
            } 
        });
    
        if (!user) {
            c.status(403);
            return c.json({
            message: "user doesn't exist"
        })
        }
    
        const token = await sign({'id':user.id}, c.env.JWT_SECRET)
    
        return c.text(token)
    } catch (e) {
        console.log(e);
        c.status(401)
        c.text("wrong creds")
    } 
})