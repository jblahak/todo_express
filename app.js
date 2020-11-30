// Modules
const express =  require('express')

// Imports
const apiRouter = require('./apiRouter').router

// Params
const port = 4443

// Instantiate server
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/', apiRouter)

// Launch Server
app.listen(port, () => {
    console.log(`Server listening on port ${port} 🚀`)
})