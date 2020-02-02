const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

const Router = require("../server/router/api");
//HomeBoy123

// const MONGDB_URI =
//   "mongodb+srv://ATOM03:HomeBoy123@cluster0-mnfeh.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/Post", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => console.log("Caught", err.stack));

mongoose.connection.on("connected", () => {
  console.log("Mongoose is Connected!!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Schem
const data = {
  title: "Welcome Priyanshu",
  body: "Hi Priyanshu,You are Selected For amazon Software Developer"
};

// const newBlogPost = new BlogPost(data);
// newBlogPost.save(error => {
//   if (error) {
//     console.log("Opps,Something Happend");
//   } else {
//     console.log("Data has been saved");
//   }
// });

app.use(morgan("tiny"));

app.use("/api", Router);

app.listen(PORT, console.log(`Server is Running at ${PORT}`));
