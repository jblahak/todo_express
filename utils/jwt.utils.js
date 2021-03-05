const jwt = require('jsonwebtoken')
const SECRET_JWT = 'secret'

module.exports = {
    generateTokenForUser: userData => {
        return jwt.sign(
            {
                id: userData.id,
                admin: userData.admin
            }, 
            SECRET_JWT,
            {
                expiresIn: '24d'
            }
        )
    },
    parseAuthorization: authorization => {
        return authorization != null ? authorization.replace('Bearer ', '') : null
    },
    getUserId: authorization => {
        let userId = -1
        const token = module.exports.parseAuthorization(authorization)

        if (token != null) {
            try {
                const jwtToken = jwt.verify(token, SECRET_JWT)
                if (jwtToken != null) {
                    userId = jwtToken.id
                }
            } catch (err) { }
        }

        return userId
    }
}