const User = require('../models/user.model')
const bcrypt = require('bcrypt')


exports.findAllUsers = async(req,res)=>{
    console.log('Finding all users')

    try {
        const result = await User.find()
        res.status(200).json({status:true,data:result})
    } catch (error) {
        console.log('Error in finding all Users',error)
        res.status(400).json({status:false, data:error})
    }
}

exports.findUserByUsername = async(req,res)=>{
    let username = req.params.username

    try {
        const result = await User.findOne({username: username})
        res.status(200).json({status:true, data: result})
    } catch (error) {
        console.log('Error in find the user', error)
        res.status(400).json({status: false,data: error})
    }
}

exports.createUser = async(req,res)=>{
    let data = req.body

    const saltOrRounds = 10
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds)

    const newUser = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: hashPassword,
        role: data.role || 'PATIENT',  
        vat: data.vat,
        amka: data.amka,
        phone: data.phone,
        age: data.age,
        mothersName: data.mothersName,
        fathersName: data.fathersName
    })


    try {
        const result = await newUser.save()
        res.status(200).json({status:true, data: result})
    } catch (error) {
        console.log('Error in creating new user', error)
        res.status(400).json({status: false,data:error})
    }
}


exports.deleteUserByUsername = async(req,res)=>{
    let username = req.params.username

    try {
        const result = await User.findOneAndDelete({ username: username })
        res.status(200).json({status : true, data: result})
    } catch (error) {
        console.log('Error in deleting a user', error)
        res.status(400).json({status: false, data: error})
    }
}


exports.updateUserByUsername = async(req,res)=>{
    let updatedUser = req.body
    const username = req.body.username
    
    try {
        const result = await User.findOneAndUpdate({username: username}, updatedUser, {new: true})
        res.status(200).json({status:true, data:result})
    } catch (error) {
        console.log('Error in updating a user', error)
        res.status(400).json({status: false, data: error})
    }
}

