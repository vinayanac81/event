import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connect from "./config/dbConfig.js"
import userRoute from "./routes/userRoute.js"
import adminRoute from "./routes/adminRoute.js"
import managerRoute from "./routes/managerRoute.js"
import passport from "passport"
import session from "express-session"
const app=express()

dotenv.config();
connect()
const PORT=process.env.PORT || 4000
app.use(express.json({ limit: "100mb" }))
app.use(cors({origin:"http://localhost:5173"}));
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use("/",userRoute)
app.use("/admin",adminRoute)
app.use("/manager",managerRoute)

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);
})