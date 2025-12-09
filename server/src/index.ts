import express from "express";
import v1Router from "./routes/v1/index.js";
import { config } from "./env.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import connectDB from "./db/connect.db";
import morgan from "morgan";

const app = express();
const PORT = config.PORT;

if (config.ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();

console.log(config.FRONTEND_URL);

app.get("/api/v1/test", (_, res) => {
  return res
    .status(200)
    .json({
      message: "Server is running successfully!",
      corsOrigins: config.FRONTEND_URL,
    });
});

const corsOptions = {
  origin: [config.FRONTEND_URL, "https://chargelink.co.in"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Referer", "User-Agent"],
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1", v1Router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
