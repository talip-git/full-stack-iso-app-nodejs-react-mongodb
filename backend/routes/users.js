const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/:id',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).send({msg:'User not found',status:'404'})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id/addQuestion',async(req,res)=>{
    try {
        if(req.body.userId === req.params.id){
            let qandref = {
                standardId:req.body.standardId,
                clauseId:req.body.clauseId,
                subclauseId:req.body.subclauseId,
                question:req.body.question,
                reference:req.body.reference,
            }
            const user = await User.findById(req.params.id)

            user.qandrefs.push(qandref)

            await user.save()
            res.status(200).json(user) 
        }
        else{
            res.status(403).json('Bad request!')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id/deleteQuestion',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).send({msg:'User not found',status:'404'})
        }
        let index = 0;
        for (let i = 0; i <=user.qandrefs.length; i++) {
            if(user.qandrefs[i].standardId === req.body.standardId &&
                user.qandrefs[i].clauseId === req.body.clauseId &&
                user.qandrefs[i].subclauseId === req.body.subclauseId){
                    
                index = i;
                break;
            }
        }
        if(index && index !=0){
            user.qandrefs.splice(index,1)
            await user.save()
            res.status(200).json(user) 
        }
        else{
            user.qandrefs=[]
            await user.save();
            res.status(200).json(user) 
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;