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
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, authorization, id');
    next()
})
app.use('/api/', apiRouter)

// Launch Server
app.listen(port, () => {
    console.log(`Server listening on port ${port} 🚀`)
})