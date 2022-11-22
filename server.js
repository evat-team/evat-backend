require("dotenv").config();
const connectDB = require("./db/dbConnection");
const app = require("./app");
const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
