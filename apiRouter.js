// Modules
const express = require('express')
const todosController = require('./routes/todosController')

// Imports
const usersController = require('./routes/usersController')

// Router
exports.router = (() => {
    const apiRouter = express.Router()

    // Users routes
    apiRouter.route('/users/register/').post(usersController.register)
    apiRouter.route('/users/login/').post(usersController.login)
    apiRouter.route('/users/user/').get(usersController.getUser)
    apiRouter.route('/users/user/').put(usersController.udpateUserProfile)

    // Todos routes
    apiRouter.route('/todos/post').post(todosController.postTodo)
    apiRouter.route('/todos/getTodos').get(todosController.getTodos)

    return apiRouter
})()