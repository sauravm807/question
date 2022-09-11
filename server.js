const express = require("express");
const app = express();
const PORT = require("./config/config").PORT || 3000;

const { router } = require("./router/main.router");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/api", router);

app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));