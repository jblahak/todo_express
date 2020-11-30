const models = require('../models')
const jwt = require('../utils/jwt.utils')

module.exports = {
    postTodo: (req, res) => {
        const headerAuth = req.headers['authorization']
        const userId = jwt.getUserId(headerAuth)

        const {title} = req.body

        if (title == null) res.status(400).json({'error': 'missing parameters'})

        models.User.findOne({
            where: {id: userId}
        })
        .then(user => {
            if(user) {
                models.Todos.create({
                    title,
                    completed: 0,
                    UserId: userId,
                    likes: 0
                }).then(newMessage => {
                    if(newMessage) return res.status(201).json(newMessage)
                    else return res.status(500).json({'error': 'cannot post message'})
                })
            } else {
                return res.status(404).json({'error': 'user not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({'error': 'unable to verify user'})
        })
    },
    getTodos: (req, res) => {
        // const headerAuth = req.headers['authorization']
        // const userId = jwt.getUserId(headerAuth)

        models.Todos.findAll()
            .then(todos => {
                if (todos) return res.status(200).json(todos)
                else return res.status(404).json({'error': 'todos not found'})
            })
            .catch(err => {
                return res.status(500).json({'error': 'unable to fetch todos'})
            })
        
    }
}