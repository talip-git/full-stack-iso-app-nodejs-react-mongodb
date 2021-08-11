const express = require('express')
const router = express.Router()
const Standard =  require('../models/Standard')
//get standard
router.get('/:id',async (req,res)=>{
    try {
        if(req.body.standardId === req.params.id){
            const standard = await Standard.findById(req.params.id)
            if(!standard){
                res.status(404).send({msg:'Not found!',status:'404'})
            }
            res.status(200).send(standard)
        }
        else{
            res.status(401).send({msg:'You can not do this operation',status:'401'})
        }
    } catch (error) {
        res.status(500).send({msg:'error',error:error,staus:'500'})
    }
})
//create standard
router.post('/addStandard',async (req,res)=>{
    console.log(req.body)
    try {
        const newStandard = await new Standard({
            standardType:req.body.standardType,
            clauses:[{
                number:req.body.number,
                desc:req.body.desc,
                subclauses:[
                    {
                        number:req.body.subnumber,
                        desc:req.body.subdesc,
                    },
                ],
            }],
        })
        await newStandard.save()
        res.status(200).json(newStandard)
    } catch (error) {
        res.status(500).send({msg:'error',error:error,staus:'500'})
    }
})

//update standard
router.put('/updateStandard/addSubclause/:id',async (req,res)=>{
    try {
        if(req.body.standardId === req.params.id){
            let subclause = {
                number:req.body.subnumber,
                desc:req.body.subdesc,
            }
            const standard = await Standard.findById(req.params.id)
            if(!standard){
                res.status(404).json('Not found!')
            }
            standard.clauses.forEach(element => {
                if(String(element._id) === req.body.clauseId){
                    console.log("true")
                    element.subclauses.push(subclause)
                    return;
                } 
            });
            await standard.save()
            res.status(200).json(standard)
        }
        else{
            res.status(403).json('Bad Request')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/updateStandard/addClause/:id',async (req,res)=>{
    try {
        if(req.body.standardId === req.params.id){
            let clause = {
                number:req.body.number,
                desc:req.body.desc,
            }
            const standard = await Standard.findById(req.params.id)
            if(!standard){
                res.status(404).json('Not found!')
            }
            standard.clauses.push(clause)
            await standard.save()
            res.status(200).json(standard)
        }
        else{
            res.status(403).json('Bad Request')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//delete standard
router.delete('/delete/:id',async (req,res)=>{
    try {
        if(req.body.standardId === req.params.id){
            const standard = await Standard.findByIdAndDelete(req.params.id)
            if(!standard){
                res.status(404).send({msg:'Not found!',status:'404'})
            }
            res.status(200).send({msg:'Delete operation succesfull',standard:standard})
        }
        else{
            res.status(401).send({msg:'You can not make this operation',status:'401'})
        }
    } catch (error) {
        res.status(500).send({msg:'error',error:error,staus:'500'})
    }
})
//Get all standards
router.get('/get/all',async(req,res)=>{
    try {
        const standard = await Standard.find({})
        res.status(200).json(standard)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;