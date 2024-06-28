import { z } from 'zod';
declare const Signup: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type SingupInput = z.infer<typeof Signup>;
declare const Signin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SinginInput = z.infer<typeof Signin>;
declare const Order: z.ZodObject<{
    orderId: z.ZodNumber;
    orderContent: z.ZodString;
    amount: z.ZodNumber;
    orderAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    orderId: number;
    orderContent: string;
    amount: number;
    orderAt: Date;
}, {
    orderId: number;
    orderContent: string;
    amount: number;
    orderAt: Date;
}>;
export type OrderInput = z.infer<typeof Order>;
export {};
