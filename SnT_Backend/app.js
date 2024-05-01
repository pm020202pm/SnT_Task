import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import morgan from "morgan"
import {router} from "./routes/routes.js";

const port =  process.env.PORT || 3000

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use("",router)

// Handling Errors
app.use((err,req,res,next) => {
    console.log(err.stack)
    res.status(500).send("Internal server error")
})

app.listen(port, console.log(`Server Listening on ${port}`))