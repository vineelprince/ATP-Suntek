import exp from 'express'
import {register,authenticate} from '../Services/authService.js'
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import { checkAuthor } from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';

export const authorRoute = exp.Router();

//Register Author(public)
    authorRoute.post('/users',async(req,res)=>{
        //get user object from req
        let authorObj = req.body
        //call register
        const newAuthorObj = await register({ ...authorObj, role: "AUTHOR" })
        //send res
        res.status(201).json({message:"Author Created", payload: newAuthorObj})
    });

//Create Article(protected route)
    authorRoute.post('/articles',verifyToken,checkAuthor,async (req,res)=>{
        //get article form the req
        let article = req.body
        //cerate article document
        let newArticleDoc = new ArticleModel(article)
        //save
        let createdArticleDoc = await newArticleDoc.save()
        //send res
        res.status(201).json({message:"ARTICLE CREATED",payload:createdArticleDoc})
    })

//Read all Articles by Author(protected route)
    authorRoute.get("/articles/:authorId",verifyToken, checkAuthor, async(req,res)=>{

        //get author id from url 
        let authorId = req.params.authorId
        //check the author
        let author = await UserTypeModel.findById(authorId)
        if(!author || author.role !== "AUTHOR"){
            return res.status(401).json({message: "Invalid Author"})
        }
        //read articles by this author whicah are active
        let articles = await ArticleModel.find({author: authorId,isArticleActive:true}).populate("author","firstName email")
        //send res
        res.status(200).json({message:"ALL ARTICLES",payload:articles})
    })

//Edit Article(protected route)
    authorRoute.put("/articles",verifyToken,checkAuthor,async(req,res)=>{
        //get modified article from req
        let {title,category,content,articleId} = req.body
        let authorId = req.body?.author || req.user?.userID
        //find article
        let articleOfDB = await ArticleModel.findOne({_id:articleId,author: authorId})
        if(!articleOfDB){
            return res.status(401).json({message:"Article Not Found"})
        }
        //update the article
        let updatedArticle = await ArticleModel.findByIdAndUpdate(articleId,
            {$set:{title,category,content}},{new:true})
        //send res(updatrd article)
        return res.status(200).json({message:"Article Updated",payload:updatedArticle})
    })

//Delete Article(Soft Delete)(protected route)
    authorRoute.delete("/articles/:articleId",verifyToken,checkAuthor,async(req,res)=>{
        //get article id from url
        let articleId = req.params.articleId
        let authorId = req.body?.author || req.user?.userID
        //find article
        let articleOfDB = await ArticleModel.findOne({_id:articleId,author:authorId})
        if(!articleOfDB){
            return res.status(401).json({message:"Article Not Found"})
        }
        //soft delete the article by setting isArticleActive to false
        await ArticleModel.findByIdAndUpdate(articleId,{$set:{isArticleActive:false}})
        //send res
        return res.status(200).json({message:"Article Deleted"})
    })
