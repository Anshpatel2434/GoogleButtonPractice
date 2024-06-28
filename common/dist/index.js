"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Signup = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const Signin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const Order = zod_1.z.object({
    orderId: zod_1.z.number(),
    orderContent: zod_1.z.string(),
    amount: zod_1.z.number(),
    orderAt: zod_1.z.date()
});
