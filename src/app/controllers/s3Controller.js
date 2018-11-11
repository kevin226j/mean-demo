import {_upload,_delete} from  '../services/s3.service';

const singleUpload = _upload.single('image');

export const uploadMedia =  (req, res) => {
    
    singleUpload(req, res, function(err) {
        if (err){
            return res.status(422).send({errors: [{title: 'File upload error', details: err.message}]})
        } 
        return res.json({'key': req.file.key});
    })
}

export const deleteMedia = (req, res) => {
     _delete(req, res, function(err, data){
         if(err) res.status(400).send({errors: [{title: 'delete error', details: err.message}]})
         return res.json({'key': req.body});
     })
}