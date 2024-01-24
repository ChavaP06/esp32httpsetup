const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.json()); //ทำให้ API เห็น body ได้
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "./files")));
app.use(cors());



app.use("/api", require("./api/webapi"));

//================================================
app.listen(2005, () => {
  console.log("Backend is running..."); 
});  