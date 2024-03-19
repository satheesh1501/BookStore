import express from "express";

const router  = express.Router();

import {BOOK} from '../models/bookmodels.js';

//Route for create new book
router.post('/',async(req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({message:'send all required fields:title, author, publishyear'});
        }
        const newbook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        };
        const book = await BOOK.create(newbook);
        return res.status(200).send(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});
//Route for get all books from database
router.get('/', async(req,res)=>{
try{
    const books = await BOOK.find({});
    return res.status(200).json({
        count : books.length,
        data : books
    });
}
catch(error)
{
    console.log(error.message);
    res.status(400).send({message:error.message});
}
});
//Route for get one from database by id
router.get('/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const book = await BOOK.findById(id);
        return res.status(200).json(book);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(400).send({message:error.message});
    }
    });

//Route for update a book
router.put('/:id',async(req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({message:'send all required fields:title, author, publishyear'});
        }
       
        const { id } = req.params;
        const result = await BOOK.findByIdAndUpdate(id, req.body);
        
        if(!result)
        {
            return res.status(404).json({message : 'Book not found'});
        }

        return res.status(200).send({ message : 'Bok update Sucessfully'});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});
//Route for delete a book
router.delete('/:id',async(req, res)=>{
    try{
        const { id } = req.params;
        const result = await BOOK.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(404).json({message : 'Book not found'});
        }
        return res.status(200).send({ message : 'Bok deleted Sucessfully'});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});


export default router;