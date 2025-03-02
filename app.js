const express = require('express')
const app = express()
const router = require('./routes/routes')
const connectDB = require('./lib/db')
const ErrorLogger = require('./utilities/errorLogger')
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB()

app.use('/',router)
app.use(ErrorLogger)

app.listen(PORT,()=>{console.log(`Server started at http://127.0.0.1:${PORT}`)})

/**
 * {
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.11.0"
  }
}
 */