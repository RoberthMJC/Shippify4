const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api", require("./routes/api"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
