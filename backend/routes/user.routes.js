let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router()

// configure where to store the images in multer    
const DIR = './public/'

//config the multer storage
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, DIR)
    },
    filename: (req,file,cb)=>{
        const fileName=file.originalname.toLowerCase().split(' ').join( '-')
        cb(null, uuidv4()+'-'+fileName)
    }
})

// upload file type check
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
           cb(null, true) 
        }else {
            cb(null, false)
            return cb(new Error('Only png jpg or jpeg formats allowed'))
        }
    }
})

//import user model
let User = require('../models/User')

// this is the user profile route to upload the image
router.post('/user-profile', upload.single('profileImg'), (req,res,next)=> {
    
    //const url= req.protocol+'://localhost:4000'
    // const user = new User({
    // _id:new mongoose.Types.ObjectId(),
    // name: req.body.name,
    // profileImg: url+'/public/'+req.filename
    // })
    // user.save().then( result =>{
         res.status(201).json({
         message: 'User was registered successfully ',
    //         UserCreated: {
    //             id: result._id,
    //             profileImg:result.profileImg
    //         }
         })
    // }) .catch(err=>{
    //     console.log(err)
    //     res.status(500).json({
    //         error:err
    //     })
    // })    
})

router.get('/', (req, res, next)=>{
    User.find().then(data=>{
        res.status(200).json({
            message: 'User list retrieved successfully',
            users:data
        })
    })
})

module.exports = router