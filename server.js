const mongoose = require('mongoose')
const app = require('./app')
const port = 3000


mongoose.connect(process.env.MONGODB_URI)
    .then(
        ()=>{
            console.log("Connection to MongoDB Esttablished")

            app.listen(port,()=>{
                console.log("Server is up")
            })
        },
        err => { console.log("Failed to connect to MongoDB", err)}
    )