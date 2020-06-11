var express = require('express');
var router = express.Router();
const multer = require("multer");
const multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
const path = require('path')
var bodyParser = require('body-parser')
const formidable = require('formidable');
var fs = require('fs');

AWS.config.accessKeyId = process.env.aws_access_key_id;
AWS.config.secretAccessKey = process.env.aws_secret_access_key;
AWS.config.region = process.env.region;



/*AWS.config.getCredentials(function(err) {
    
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
      console.log("Secret access key:", AWS.config.credentials.region);
    }
  });*/

AWS.config.apiVersions = {
    //dynamodb: '2011-12-05', 
    //ec2: '2013-02-01',
    dynamodb: 'latest'
}
var db = new AWS.DynamoDB.DocumentClient();



function inputToDynamo(params){
    db.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}



//#######################s3
let s3 = new AWS.S3();
var today = new Date();
var date = today.getFullYear()+":"+(today.getMonth()+1)+":"+today.getDate()+":"+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let upload = multer({    
    storage: multerS3({
        s3: s3,
        bucket: "showmethestyle.com/temp",
        metadata: function (req, file, cb) {
          console.log(req.params)
            cb(null, Object.assign({}, req.body));
          },
        key: function (req, file, cb) {
            
            let extension =file.originalname+"-"+date;   
            
            
            cb(null, extension)
        },
        acl: 'public-read-write',
    })
})


router.route('/upload').post((req, res, next)=>{
  const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    const file = files.image
    
    fs.readFile(file.path, function (err, data) {
      if (err) throw err; // Something went wrong!
      var s3bucket = new AWS.S3({params: {Bucket: 'showmethestyle.com/temp'}});
      s3bucket.createBucket(function () {
          var params = {
              Key: fields.imageId, //file.name doesn't exist as a property
              Body: data,
              ACL:'public-read'
          };
          s3bucket.upload(params, function (err, data) {
              // Whether there is an error or not, delete the temp file
              fs.unlink(file.path, function (err) {
                  if (err) {
                      console.error(err);
                  }
                  console.log('Temp File Delete');
              });

              console.log("PRINT FILE:", file);
              if (err) {
                  console.log('ERROR MSG: ', err);
                  res.status(500).send(err);
              } else {
                  console.log('Successfully uploaded data');
                  res.status(200).end();
              }
          });
      });
  });
   
    
  });
});
  
  
    
    /*var today = new Date();
    date = today.getFullYear()+":"+today.getMonth()+":"+today.getDate()+":"+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var params = {
        TableName:'showmethestyle',
        Item:{
            "id":date+"master"+":"+req.file.originalname,
            "uploadDate": date,
            "owner": "master",
            "url":"https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/"+req.file.originalname,
            "category":"etc"
        }
    };
    
    inputToDynamo(params);*/    
    
    
    


/*router.get('/table-list', function (req, res, next) {
    console.log('xxx')
    db.scan(params, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
        }
    });

    res.send('AWS - See the console plz.');
});*/
var params = {
  TableName : "Users",  
  Key:{
    userId:"moonseok"
  }
  
};
db.get(params,function(err,data){
  if(err){
    console.log("err")
  }else{
    //console.log(data);
    return (data);
  }
})
module.exports = router
