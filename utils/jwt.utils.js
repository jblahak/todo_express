const jwt = require('jsonwebtoken')

const SECRET_JWT = 'dz345ooher53dj25vert761djhcnzaoc5zncziriv622cjcqaev644acxjeir32d'

module.exports = {
    generateTokenForUser: userData => {
        return jwt.sign(
            {
                id: userData.id,
                admin: userData.admin
            }, 
            SECRET_JWT,
            {
                expiresIn: '1h'
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