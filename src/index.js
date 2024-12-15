const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const task = require("./models/task");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();

const port = process.env.PORT || 3000;
// app.use converts incoming json into an object so that we can use it in request handlers
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
