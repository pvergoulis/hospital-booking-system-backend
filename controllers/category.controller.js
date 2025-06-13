const Category = require('../models/category.model')


exports.findAllCategories = async(req,res)=>{
    console.log('Finding all categories')

    try {
        const result = await Category.find()
        res.status(200).json({status: true, data: result})
    } catch (error) {
        console.log('Error in finding all categories')
        res.status(400).json({status: false, data: error})
    }
}


exports.createCategory = async(req,res)=>{
    let data = req.body;

    const newCategory = new Category({
        name: data.name
    })

    try {
        const result = await newCategory.save()
        res.status(200).json({status: true, data: result})
    } catch (error) {
        console.log('Error in creating new category')
        res.status(400).json({status : false, data: error})
    }
}

exports.deleteCategory = async(req,res)=>{
    let name = req.params

    console.log('Delete category with name: ', name)

    try {
        const result = await Category.findOneAndDelete(name)
        res.status(200).json({status : true, data: result})
    } catch (error) {
        console.log('Error in deleting category: ', name)
        res.status(400).json({status: false, data: error})
    }
}


