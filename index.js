const express = require("express");
const app = express();
require('dotenv').config()
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require('express-jwt')
const path = require("path")
const port = process.env.PORT || 5000;
const dev_db_url = 'mongodb+srv://developerWilliams:R3rbmFmZZL43eY9@cluster0.askcq.mongodb.net/guidebook?retryWrites=true&w=majority'
const mongoDB = process.env.MONGODB_URI || dev_db_url;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(
  mongoDB, {useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to the DB")
);
app.use("/auth", require("./routes/authRouter"))
app.use('/notebook', expressJwt({secret:process.env.SECRET, algorithms: ['HS256']}))
app.use("/notebook/users", require("./routes/userRouter"))
app.use("/notebook/ideas", require("./routes/ideaRouter"))
app.use("/notebook/characters", require("./routes/characterRouter"))
app.use("/notebook/settings", require("./routes/settingRouter"))
app.use("/notebook/plots", require("./routes/plotRouter"))
app.use("/notebook/conflicts", require("./routes/conflictRouter"))
app.use("/notebook/climax", require("./routes/climaxRouter"))
 


app.use((err, req, res, next)=>{
    console.log(err)
    return res.send({errMessage: err.message})
})
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log("connected to the server");
});
