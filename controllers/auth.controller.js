const bcrypt = require('bcrypt')
const User = require('../models/user.model')

const authService = require('../services/auth.service')


exports.login = async(req, res)=>{
    const username = req.body.username
    const password = req.body.password

    try {
        const result = await User.findOne({username: username}, {username :1, password: 1, email: 1, roles:1})

        if (!result) {
            return res.status(404).json({ status: false, data: "User not found" });
        }

        const isMatched =  await bcrypt.compare(password, result.password)



        if(username === result.username && isMatched){
            const token = authService.generateToken(result)
            res.status(200).json({status:true, data: token})
        }else{
            res.status(404).json({status:false, data: "User not logged in"})
        }
    } catch (error) {
        console.log('Error with logging', error)
        res.status(400).json({status : false, data : error})
    }
}