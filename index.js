const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeRecipes = require("./src/routes/routes");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/recipes", routeRecipes, (req, res) => res.sendStatus(401));

// app.use("/")
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/public/index.html"));
    // res.send("hello world")
})

const PORT = 5000;
app.listen(PORT);

console.log(`server started on ${PORT}`);