const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const mainRounter = require("./routes/index");
const cors = require('cors');

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/api/v1", mainRounter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});