const axios = require('axios');
var AWS = require('aws-sdk');
const path = require('path')
const multer = require("multer");
const multerS3 = require('multer-s3');

AWS.config.accessKeyId = process.env.aws_access_key_id;
AWS.config.secretAccessKey = process.env.aws_secret_access_key;

AWS.config.region = process.env.region;

AWS.config.apiVersions = {
  //dynamodb: '2011-12-05', 
  //ec2: '2013-02-01',
  dynamodb: 'latest'
}
var db = new AWS.DynamoDB.DocumentClient();

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userId: { type: GraphQLString },
    userName: { type: GraphQLString },
    userNickName: { type: GraphQLString },
  })
});
const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  fields: () => ({
    id: { type: GraphQLString },
    url: { type: GraphQLString },
    category: { type: GraphQLString },
    owner: { type: GraphQLString },
    uploadDate: { type: GraphQLString },
    originalname: { type: GraphQLString }
  })
});


/*const AllUsers = new GraphQLObjectType({
  name: 'AllUsers',
  fields: () => ({
    userId: { type: GraphQLString },
  })
});*/



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Photos: {
      type: new GraphQLList(PhotoType),
      resolve(parent, args) {
        var params = {
          TableName: "showmethestyle",          
          };        
        return db.scan(params).promise().then(res => res.Items);
      }
    },
    AllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        var params = {
          TableName: "Users"
        };
        return db.scan(params).promise().then(res => res.Items);
      }
    },
    User: {
      type: UserType,
      args: {
        userId: { type: GraphQLString }
      },
      resolve(parent, args) {
        var params = {
          TableName: "Users",
          Key: {
            'userId': ''
          }
        }
        
        params.Key.userId = args.userId;

        return db.get(params).promise().then(res => res.Item);
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
        userName: { type: GraphQLString },
        userNickName : {type : GraphQLString},      
      },
      resolve(parent, args) {
        params = {
          TableName: "Users",
          Item: {
            'userId': args.userId,
            'userName': args.userName,
            'userNickName': args.userNickName
          }
        }
        return db.put(params).promise().then(res => console.log(res));
      }
    },
    SetUserNickName:{
      type: UserType,
      args:{
        userId : {type : GraphQLString},
        userNickName:{type:GraphQLString}
      },
      resolve(parent,args){
          params = {
          TableName:"Users",
          Key:{
            'userId': args.userId,
              
          },
          UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
          ExpressionAttributeValues:{
              ":N":5.5,
              
              
          },
          ReturnValues:"UPDATED_NEW"
      };
      }

    },
    UploadPhoto: {
      type: PhotoType,
      args: {
        owner: { type: GraphQLString },
        category: { type: GraphQLString },
        originalname: { type: GraphQLString },
        uploadDate: { type: GraphQLString },
        
      },
      resolve(parent, args) {
        params = {
          TableName: "showmethestyle",
          Item: {
            "id":args.uploadDate + "-" + args.originalname+"-",
            "uploadDate": args.uploadDate,
            "owner": args.owner,
            "url": "https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/" + args.category + "/"+args.uploadDate+"-"+args.originalname,
            "category": args.category
          }
        }
        
        return db.put(params).promise().then(res =>res);
      }
    }
  }

})

module.exports = new GraphQLSchema({
  query: RootQuery, mutation: RootMutation
})