const bcrypt = require('bcrypt')

async function hashPassword(plainPassword){
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(plainPassword,saltRounds)
    return hashPassword;
}
async function comparePassword(password, userPassword) {
    return (await bcrypt.compare(password,userPassword))
}
module.exports = {hashPassword,comparePassword}