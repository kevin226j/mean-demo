const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 =  require('multer-s3');
const responses = require('../handlers/response')
require('dotenv').config();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRETKEY,
    accessKeyId: process.env.AWS_ACCESSKEYID,
    region: process.env.AWS_REGION
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime type, only use JPEG and PNG'), false);
    }
}

exports._upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        metadata: function(req, file, cb){
            cb(null, {fieldName: 'image'});
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
    
})

exports._delete = (req, res, next) => {
    let objects = [];
    
    let items = req.body.items;

    for(let i = 0, n = items.length; i < n; i++){
        objects.push({Key: (items[i])})
    }
    
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Delete: {
            Objects: objects
        }
    }

    s3.deleteObjects(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}
