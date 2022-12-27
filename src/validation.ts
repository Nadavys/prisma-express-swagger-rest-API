import { z } from "zod"


export function validateUser(input: any) {
        return z.object({
            name: z.string(),
            email: z.string().email(),
        }).parse(input)
}


export function validatePost(input: any) {
    return z.object({
        title: z.string().min(10),
        body: z.string().min(10).max(5000),
        writerId: z.number()
    }).parse(input)
}



