const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Router=require("./router/routes");
const ApiRoute=require("./api/routes")
const ClouniaryRouter=require("./helper/cloudinary-helper")
const {conn}=require("./conn")
const app = express();
require('dotenv').config();//loading env file
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",        // which frontend can access
  methods: ["GET", "PUT", "POST", "DELETE"],  // allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  credentials: true,                       // allow cookies
  optionsSuccessStatus: 200
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(Router)
app.use(ClouniaryRouter)
app.use(ApiRoute)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(" Server is listening at port number:", PORT);
});
