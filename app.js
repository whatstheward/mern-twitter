// Express for routes
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const passport = require('passport')
const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets")

// Connect to MongoDB
mongoose
.connect(db, { useNewUrlParser: true})
.then(()=>console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err))

// BodyParser to parse JSON
const bodyParser = require('body-parser')
// Middleware for BodyParser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// Routes
app.use(passport.initialize())
require('./config/passport')(passport)
app.use("/api/users", users)
app.use("/api/tweets", tweets)

    
    
// Define port 
const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`Server is running on port ${port}`))
    
    
