const express = require("express");
const cluster = require("cluster");
const { cpus } = require("os");
const createHttpError = require("http-errors");
const { nextTick } = require("process");
var cookieParser = require("cookie-parser");
const authRoute = require("./src/Routes/auth.route");
const fileRouter = require("./src/Routes/file.route");
require("dotenv").config();
const cors = require("cors");
require("./src/Config/init_mongodb");
const { verifyAccessToken } = require("./src/Helpers/jwt_helper");

const app = express();
app.use(cors()); //to avoid cors error

const PORT = process.env.PORT || 8080;
const numOfCpus = cpus().length; //to count the cpu threads
app.use(express.json()); //json body data take
app.use(express.urlencoded({ extended: true })); //url prams data take
app.use(cookieParser()); //to read cookies

// app.get("/", verifyAccessToken, async (req, res) => {
//   res.send({
//     message: "hi, How are you fucker!",
//     data: {
//       name: req.payload.name,
//       email: req.payload.email,
//       payload: req.payload,
//     },
//   }); //just a normal home api
// });

app.use("/api/auth", authRoute); //authentication api router
app.use("/api/file", verifyAccessToken, fileRouter); //file cred operation router

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("Sorry! This route is not available."));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// if (cluster.isMaster) {
//   for (var cpu = 0; cpu < numOfCpus; cpu++) {
//     cluster.fork();
//     // console.log(process.pid);
//   }
//   cluster.on("exit", () => {
//     cluster.fork();
//   });
// } else {
//   app.listen(PORT, () => {
//     console.log(
//       `started on port:(Process: ${process.pid}) http://localhost:${PORT}`
//     );
//   });
// } // to make nodejs api scalable

app.listen(PORT, () => {
  console.log(
    `started on port:(Process: ${process.pid}) http://localhost:${PORT}`
  );
});
