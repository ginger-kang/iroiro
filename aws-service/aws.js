var express = require('express');
var router = express.Router();
const multer = require("multer");
const multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
const path = require('path')

AWS.config.accessKeyId = process.env.aws_access_key_id;
AWS.config.secretAccessKey = process.env.aws_secret_access_key;
AWS.config.region = process.env.region;


console.log(AWS.config)
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

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "showmethestyle.com",
        key: function (req, file, cb) {
            let extension =(file.originalname);
            
            cb(null, extension)
        },
        acl: 'public-read-write',
    })
})

router.post('/upload', upload.single("imgFile"), function (req, res, next) {
    var today = new Date();
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
    
    inputToDynamo(params);
    let imgFile = req.file;
    res.json(imgFile);
})

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
