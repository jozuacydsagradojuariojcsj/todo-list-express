const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT;

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin")

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {console.log(`Server Running on Port:${port}`)});
