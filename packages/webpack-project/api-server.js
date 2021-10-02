const express = require("express");

const app = express();

app.listen(3000, function() {
    console.log("server listen on 3000");
});

app.get("/api", (req, res) => {
    res.send('hello');
});
