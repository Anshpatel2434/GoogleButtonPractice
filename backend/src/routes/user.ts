import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  //zod validation here

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const exists = await prisma.customer.findUnique({
      where: {
        email: body.email,
      },
    });
    if (exists)
      return c.json({
        message: "user already exists",
      });
  } catch (e) {
    return c.json({
      message: "sign up failed",
    });
  }

  try {
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign(
      {
        id: customer.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "signed up successfully",
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      message: "signup failed",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  //zod validation here

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!customer) {
      c.status(403);
      return c.json({
        message: "Incorrect credentials",
      });
    }

    const jwt = await sign(
      {
        id: customer.id,
      },
      c.env.JWT_SECRET
    );

    return c.text("signed in");
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({ message: "signin error" });
  }
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.6bFcCtTAdwYozlEy0_wxYOGwNlgcTaIIWtRBEUCGcFU
