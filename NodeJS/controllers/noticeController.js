const express = require('express')
var router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId

var { Notices } = require('../models/notices')

//GET Method For Display
router.get('/', (req, res) => {
    Notices.find((err, docs) => {
        if(!err) {
            console.log(docs)
            res.send(docs)

        }
        else
            console.log("Error in Retriving Notices :" + express.json(err))
    })
})

//GET BY ID
router.get('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send("No record with given id: ${req.params.id}")
    Notices.findById(req.params.id, (err, doc) => {
        if(!err)
            res.send(doc)
        else
            console.log("Error in Retriving Notices :" + json(err))

    })
})

//POST
router.post('/',(req,res) => {
    console.log('Mongo Update Called')
    var note = new Notices({
        note: req.body.note
    })
    console.log(note)
    note.save((err, doc) =>{
        if(!err) res.send(doc)
        else console.log("Error: " + json(err))
    })
})

//PUT FOR UPDATE
router.put('/:id', (req,res) => {
    console.log('Mongo Update Called')
    if(!ObjectId.isValid(req.params.id)){
        console.log('Mongo Update Id Error' + +json(req.params.id))
        return res.status(400).send("No record with given id: "  +json(req.params.id))
    }
        
    var note = {
            note: req.body.note
        }
    Notices.findByIdAndUpdate(req.params.id,  { $set: note }, {new: true}, (err, doc) => {
        if(!err)
            res.send(doc)
        else
            console.log('Error in Notices Update: ' + express.json(err))
    })
})

router.delete('/:id', (req, res) => {
    console.log('Mongo Delete Called')
    if(!ObjectId.isValid(req.params.id))
    {
        console.log('Mongo Delete Id Error'+json(req.params.id))
        return res.status(400).send("No record with given id: ${req.params.id}")
    
    }
        
    Notices.findByIdAndDelete(req.params.id, (err, doc) => {
            if(!err){
                //console.log("!Error in Delete")
                //console.log(doc)
                res.send(doc)

            }
                
            else
                console.log('Error in Notices Delete: ' + express.json(err))
        })
    

})

module.exports = router