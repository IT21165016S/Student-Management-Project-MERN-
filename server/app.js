require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/students");
const userRoutes = require("./routes/user");

const app = express();

// to access request body we need to put this
app.use(express.json({ limit: "50mb" }));

app.use("/api/students", studentRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // make the app listen to port 4001 for requests from frontend only after the db connection is done
    app.listen(process.env.PORT, () => {
      console.log(
        "Database connection success. Listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log("Database Connection Error : ", error);
  });
