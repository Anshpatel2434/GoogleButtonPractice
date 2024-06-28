import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type variables = {
  orderId: string;
};
export const orderRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: variables;
}>();

//jwt authorization
orderRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const customer = await verify(authHeader, c.env.JWT_SECRET);
    if (customer) {
      c.set("orderId", customer.id + "");
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({
      error: e,
    });
  }
});

orderRouter.post("/", async (c) => {
  const body = await c.req.json();

  //zod validation here

  const orderId = c.get("orderId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const order = await prisma.order.create({
      data: {
        amount: Number(body.amount),
        orderContent: body.orderContent,
        orderId: Number(orderId),
      },
    });

    return c.json({
      id: order.id,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      orderId: orderId,
      body: body,
      error: e,
    });
  }
});
