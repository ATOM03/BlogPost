const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

const Router = require("../server/router/api");

const MONGDB_URI =
  "mongodb+srv://dbUser:dbUser@commentpost-qrj5d.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(MONGDB_URI || "mongodb://localhost/Post", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log("Caught", err.stack));

mongoose.connection.on("connected", () => {
  console.log("Mongoose is Connected!!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors());

app.use("/api", Router);

app.listen(PORT, console.log(`Server is Running at ${PORT}`));
