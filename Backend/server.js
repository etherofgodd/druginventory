import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";

import { connectDb } from "./utils/connectDb.js";
import routes from "./routes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(morgan("dev"));
// routes
routes(app);

// server
app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`.blue.italic)
);

app.use(notFound);
app.use(errorHandler);
