const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRouter");
const applicationRouter = require("./routes/applicationRouter");
const jobRouter = require("./routes/jobRouter");
const { dbConnection } = require("./databases/dbConnection");
const { errorMiddleware } = require("./middlewares/error");
dotenv.config({ path: "./config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);
dbConnection();
app.use(errorMiddleware);
module.exports = app;
