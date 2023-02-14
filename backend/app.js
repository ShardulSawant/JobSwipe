require("dotenv").config();
require("express-async-errors");

//Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
//const ratelimiter = require("express-rate-limit");

const express = require("express");
const app = express();

// connect database
const connectDB = require("./db/connect");

//Authentication middleware
const authenticateUser = require("./middleware/authentication");
const authenticateJobSeeker = require("./middleware/authenticateJobSeeker");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const jobSeekerRouter = require("./routes/JobSeeker");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

/* app.set("trust porxy", 1);
app.use(
  ratelimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
); */
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/jobSeeker", authenticateJobSeeker, jobSeekerRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
