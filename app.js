const setupDB = require("./db/initialDBSetup");
const user = require("./routes/users");
const group = require("./routes/groups");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", user);
app.use("/api/v1/group", group);

const startServer = async () => {
  try {
    const isDBSetup = await setupDB();
    if (!isDBSetup) {
      throw new Error("DB setup failed.");
    }
    app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
