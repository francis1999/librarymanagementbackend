const express=require("express")
const http=require("http")
const NotFound=require("./Middlewares/notfound")
const db=require("./db");
const helmet=require("helmet");
const app=express()
const Grid = require("gridfs-stream")
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("./db")
const xss=require("xss-clean")
const path=require("path")
const rateLimiter=require("express-rate-limit")
const asyncRapper=require("./Middlewares/asyncRapper")
const logger=require("./Middlewares/loggers")
app.use(express())
dotenv.config();
const {StatusCodes}=require("http-status-codes")
app.use(logger)

connection();
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn, mongoose.mongo);
    gfs.collection("uploads");
})

//Route declaration goes here
const userRouter = require('./Routes/userRouter');
const addaboutRouter = require('./Routes/aboutme');
const adminRouter = require('./Routes/adminRouter');
const departmentRouter = require('./Routes/departmentRouter');
const courseRouter = require('./Routes/courseRouter');







app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(xss())



//Router declaration goes here

app.use('/api/user', userRouter);
app.use('/api/addabout', addaboutRouter);
app.use('/api/admin', adminRouter);
app.use('/api/department', departmentRouter);
app.use('/api/course', courseRouter);




app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 8088;
app.get("/", (req,res)=>{
    res.status(StatusCodes.OK).send("Library management system")
})




app.use(NotFound)
const server=http.createServer(app)
 const start=asyncRapper(async ()=>{
    server.listen(port, () => {
            console.log(`We are running on port ${port}`);
        })
 })
start(); 


