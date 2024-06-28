import {z} from 'zod'

const Signup = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export type SingupInput = z.infer<typeof Signup>

const Signin = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type SinginInput = z.infer<typeof Signin>

const Order = z.object({
    orderId: z.number(),
    orderContent: z.string(),
    amount: z.number(),
    orderAt: z.date()
})

export type OrderInput = z.infer<typeof Order>