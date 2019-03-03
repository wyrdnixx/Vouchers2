const express = require(`express`)
const mongodb = require(`mongodb`)
const pdfService = require(`./pdfService`)
require('dotenv').config();

const router = express.Router();

//const connectionString = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBDATABASE}`
const connectionString = `mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBDATABASE}`

// Get Post

router.get(`/`, async(req, res) => {
    const posts = await loadPostsCollection();
    console.log(`Request - get `)
    console.log(`Request - get: `, await posts.findOne())
    res.send(await posts.find({}).toArray());
})

// get Users
router.get(`/users`, async(req,res) => {
    const users = await loadVocherUserCollection();
    console.log(`Found users in DB: `, await users.findOne())
    res.send(await users.find({}).toArray());
})

router.get(`/pdf`, async(req, res) => {
   /* 
    console.log(`POSTS.js - generating PDF for user: `, req.body.user)
    console.log(`POSTS.js - with voucher: `, req.body.voucher)
    */
   console.log(`POSTS.js - generating PDF for user: `, req.query.user)
   console.log(`POSTS.js - with voucher: `, req.query.voucher)

     await pdfService(req,res)
    
})
 


// Add user
router.post(`/assignvoucher`, async (req,res) => {
    const users = await loadVocherUserCollection();
    const posts = await loadPostsCollection();
    console.log(`Request - Post - body: `, req.body)
    
        console.log(`user: `, req.body.user) 
        console.log(`voucher: `, req.body.voucher)
        console.log(`roll: `, req.body.roll)
        
        
            await users.insertOne({
                voucher: req.body.voucher,
                roll: req.body.roll,
                user: req.body.user,
                createdAt: new Date()
            }, function(err,obj){
                if (err) throw err;
                console.log(`assigned voucher: "${ req.body.voucher}" to user: ${ req.body.user} `);              
            });
            var currentvoucher = {
                voucher: req.body.voucher,
                roll: req.body.roll            
            }
          
            await posts.deleteOne(currentvoucher, function(err,obj) {
                if (err) throw err;
                console.log(`deleted voucher from vouchers-DB: `, currentvoucher.voucher);
                console.log(`Result-Object-count: `, obj.deletedCount);
            })
            res.status(201).send();
})


// Add Post
router.post(`/`, async (req,res) => {
    const posts = await loadPostsCollection();
    console.log(`Request - Post - body: `, req.body)
    console.log(`Request - Post - roll: `, req.body.roll)
    //await posts.insertMany    
    /* 
    //await posts.insertOne   <--------  funzt mit einem Object im Json
    await posts.insertOne({
        text: req.body.voucher,
        info: req.body.roll,
        createdAt: new Date()
    });
    */

    req.body.forEach(async doc  => {
        console.log(`Element: `, doc)
        console.log(`voucher: `, doc.voucher)
        console.log(`roll: `, doc.roll)
        await posts.insertOne({
            voucher: doc.voucher,
            roll: doc.roll            
        });
    });
  

    //status 201 = http-OK Status
    res.status(201).send();
})


//


// Delete Post
router.delete(`/:id`, async( req,res) => {
    const posts = await loadPostsCollection();
    console.log(`Request - delete - text: `, new mongodb.ObjectID(req.params.id));
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection() {
    
    console.log("ConnectionString: ", connectionString)
    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true
    })
    return client.db(process.env.DBDATABASE).collection(`posts`); 
        
}

async function loadVocherUserCollection() {
    
    console.log("ConnectionString: ", connectionString)
    const client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true
    })
    return client.db(process.env.DBDATABASE).collection(`voucherUser`); 
        
}

// Exports
module.exports = router;