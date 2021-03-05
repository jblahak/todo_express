// Modules
const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt.utils')
const regex = require('../utils/regex.utils')

// Imports
const models = require('../models')

// Routes
module.exports = {
    register: (req, res) => {
        // Params
        const {email, password, bio} = req.body

        // Verifications
        if (email == null || password == null) { return res.status(400).json({'error': 'missing parameters'}) }
        if (!regex.email.test(email)) { return res.status(400).json({'error': 'email invalid format'}) }
        if (!regex.password.test(password)) { return res.status(400).json({'error': 'password must contain between 6 and 20 characters and at least one numeric digit, one uppercase and one lowercase letter'}) }
        
        // Get user
        models.User.findOne({
            attributes: ['email'],
            where: {email}
        })
        .then(userFound => {
            if(!userFound) {
                bcrypt.hash(password, 11, (err, bcryptedPassword) => {
                    const newUser = models.User.create({
                        email,
                        password: bcryptedPassword,
                        bio,
                        admin: 0
                    })
                    .then(newUser => {
                        return res.status(201).json({
                            'UserId': newUser.id
                        })
                    })
                })
            } else {
                return res.status(409).json({'error': 'User already exist'})
            }
        })
        .catch(err => {
            return res.status(500).json({
                'error': 'Unable to verify user'
            })
        })
    },
    login: (req, res) => {
        const {email, password} = req.body

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        
        models.User.findOne({
            attributes: ['email', 'password', 'id', 'admin'],
            where: {email}
        })
        .then(userFound => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(err, result) {
                    if (result) {
                        return res.status(200).json({
                            'UserId': userFound.id,
                            'token': jwt.generateTokenForUser(userFound)
                        })
                    } else {
                        return res.status(403).json({'error': 'Invalid password'})
                    }
                })
            } else {
                return res.status(404).json({'error': 'User not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({
                'error': 'Unable to verify user'
            })
        })
    },
    getUser: (req, res) => {
        const headerAuth = req.headers['authorization']
        const userId = jwt.getUserId(headerAuth)

        if (userId < 0 ) return res.status(400).json({'error': 'wrong token'})

        models.User.findOne({
            attributes: ['id', 'email', 'bio'],
            where: {id: userId}
        })
        .then(user => {
            if (user) {
                return res.status(200).json(user)
            } else {
                return res.status(404).json({'error': 'user not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({'error': 'cannot fetch user'})
        })
    },
    udpateUserProfile: (req, res) => {
        const headerAuth = req.headers['authorization']
        const userId = jwt.getUserId(headerAuth)

        const {bio} = req.body

        if (userId < 0 ) return res.status(400).json({'error': 'wrong token'})

        models.User.findOne({
            attributes: ['id', 'bio'],
            where: {id: userId}
        })
        .then(user => {
            if (user) {
                user.update({
                    bio: (bio ? bio : user.bio)
                })
                .then(user => {
                    if (user) {
                        return res.status(201).json({'user': user})
                    } else {
                        return res.status(500).json({'error': 'cannot udapte user profile'})
                    }
                })
                .catch(err => {
                    return res.status(500).json({'error': 'cannot update user'})
                })
            } else {
                return res.status(404).json({'error': 'user not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({'error': 'unable to verify user'})
        })
    }
}