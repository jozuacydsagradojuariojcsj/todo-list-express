const express = require("express");
const app = express();

app.use(logger)

app.get("/", (req, res) => {
  console.log("wazzap");
  res.send("Aight?");
});

const userRouter = require("./routes/users");

app.use('/users', userRouter);

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(3000);
