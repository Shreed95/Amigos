import * as z from "zod";

export const SignUpValidation = z.object({
    name: z.string().min(2,{message:"Name too Short"}),
    username: z.string().min(2,{message:"Username too Short"}),
    email: z.string().email(),
    password: z.string().min(2,{message:"Password must be more than 8 charactors."})
})

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(2,{message:"Password must be more than 8 charactors."})
})

export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string()
})  

