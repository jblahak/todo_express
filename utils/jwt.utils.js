const jwt = require('jsonwebtoken')
// const fs = require('fs')
// const path = require('path')
// const yaml = require('js-yaml')

// const appDir = path.dirname(require.main.filename);
// const p = path.join(appDir, '.github/workflows', 'deploy.yml');
// const YmlFile = fs.readFileSync(p, 'utf-8')
// const data = yaml.safeLoad(YmlFile)
// const secret = data.jobs.deploy.steps[0].env.secret_jwt
// const SECRET_JWT = secret
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