const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const app = express();
const notFoundMiddleware = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const productsRouter = require('./routes/routes')
const db = require('./db/connect')


//Routes
app.use("/api/v1/products", productsRouter)

//Middlewares
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// app.get("/", (req, res)=>{
//     res.send("App run successfully!!")
// })

const port = process.env.PORT || 3000;

const main = async ()=>{
    try {
        await db(process.env.MONGO_URI);
        app.listen(port, console.log("Everthing is working"))
    } catch (error) {
        console.log(error)
    }
}

main();