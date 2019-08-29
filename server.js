const express = require("express");

const app = express();

// enable json
app.use(express.json());

// test default route
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "it works well"
    })
});

// default port
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`app started at port ${port}`)
})