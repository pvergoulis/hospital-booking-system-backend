const express= require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles
const verifyToken = require('../middlewares/auth.middleware').verifyToken

router.get('/',userController.findAllUsers)
router.get('/:username',verifyToken, userController.findUserByUsername)
router.post('/create', userController.createUser)
router.patch('/update/:username',verifyToken,verifyRoles("ADMIN"), userController.updateUserByUsername)
router.delete('/delete/:username',verifyToken,verifyRoles("ADMIN"), userController.deleteUserByUsername)


module.exports = router