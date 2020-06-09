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
    userName: { type: GraphQLString }
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

var params = {
  TableName: "Users"
};
var params2 = {
  TableName: "Users",
  Key: {
    'userId': ''
  }
}

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Photos: {
      type: new GraphQLList(PhotoType),
      resolve(parent, args) {
        return axios
          .get('https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/amekaji')
          .then(res => res.data);
      }
    },
    AllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return db.scan(params).promise().then(res => res.Items);
      }
    },
    User: {
      type: UserType,
      args: {
        userId: { type: GraphQLString }
      },
      resolve(parent, args) {
        params2.Key.userId = args.userId;

        return db.get(params2).promise().then(res => res.Item);
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
      },
      resolve(parent, args) {
        params = {
          TableName: "Users",
          Item: {
            'userId': args.userId,
            'userName': args.userName
          }
        }
        return db.put(params).promise().then(res => console.log(res));
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
            "id": args.owner + ":" + args.originalname,
            "uploadDate": args.uploadDate,
            "owner": args.owner,
            "url": "https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/" + args.category + "/" + args.originalname,
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