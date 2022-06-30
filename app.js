require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>store api</h1><a href="/api/1/products">products</a>');
});

app.use("/api/v1/products", productRouter);

//product routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server Listening on port ${port}!!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
