const express = require("express");
const app = express();
require('dotenv').config()
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require('express-jwt')

app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/notebook",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("connected to the DB")
);
app.use("/auth", require("./routes/authRouter"))
app.use('/notebook', expressJwt({secret:process.env.SECRET, algorithms: ['HS256']}))
app.use("/notebook/users", require("./routes/userRouter"))
app.use("/notebook/ideas", require("./routes/ideaRouter"))
app.use("/notebook/characters", require("./routes/characterRouter"))
app.use("/notebook/settings", require("./routes/settingRouter"))
app.use("/notebook/plots", require("./routes/plotRouter"))
// app.use("/notebook/conflicts", require("./routes/conflictRouter"))
// app.use("/notebook/resolutions", require("./routes/resolutionRouter"))
 


app.use((err, req, res, next)=>{
    console.log(err)
    return res.send({errMessage: err.message})
})

app.listen(7000, () => {
  console.log("connected to the server");
});
