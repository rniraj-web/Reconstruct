import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req, res)=>{
    try {
        const {name} = req.body;

        if(!name){
            return res.status(401).send({message: 'Name is required'})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            res.status(200).send({
                success: true,
                message: 'Category already existed'
            })
        }

        const category = await new categoryModel({name, slug: slugify(name)}).save();
        res.status(201).send({
            success: true,
            message: 'New category created',
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in category'
        })
    }
}

export const updateCategoryController = async (req, res) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug: slugify(name)}, {new: true})
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating category'
        })
        
    }
}

// /get all categories
export const categoryController = async(req, res) =>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'All categories List',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting all categories"
        })
        
    }
}

//get single category 
export const singleCategoryController = async(req, res)=>{
    try {
        const {slug} = req.params;
        const category = await categoryModel.findOne({slug})
        res.status(200).send({
            success: true,
            message: 'Get single category successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in single category',
            error
        })
        
    }
}

export const deleteCategoryController = async(req, res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deletion category",
            error,
        })
        
    }
}