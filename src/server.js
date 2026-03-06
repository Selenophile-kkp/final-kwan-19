import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import doctorRouter from "./routes/doctor.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/doctor", doctorRouter);
app.use("/user", userRouter);

app.use("/health", (req, res) => res.send("Healthy!"));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
