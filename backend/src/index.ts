import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { orderRouter } from "./routes/order";
import { cors } from "hono/cors";

const app = new Hono();

app.use(async (c, next) => {
    c.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    await next();
  });
app.use("/*", cors());


app.route("/api/v1/user", userRouter);
app.route("/api/v1/order", orderRouter);

export default app;
