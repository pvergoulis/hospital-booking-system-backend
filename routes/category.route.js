const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')


router.get('/',categoryController.findAllCategories)
router.post('/create',categoryController.createCategory)
router.delete('/delete/:name', categoryController.deleteCategory)

module.exports = router