const axios = require("axios");
var AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.accessKeyId = process.env.aws_access_key_id;
AWS.config.secretAccessKey = process.env.aws_secret_access_key;
AWS.config.region = process.env.region;
  
AWS.config.apiVersions = {
  //dynamodb: '2011-12-05',
  //ec2: '2013-02-01',
  dynamodb: "latest",
};
var db = new AWS.DynamoDB.DocumentClient();

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    userId: { type: GraphQLString },
    userName: { type: GraphQLString },
    userNickName: { type: GraphQLString },
    userInstagram: { type: GraphQLString },
  }),
});
const PhotoType = new GraphQLObjectType({
  name: "Photo",
  fields: () => ({
    id: { type: GraphQLString },
    url: { type: GraphQLString },
    category: { type: GraphQLString },
    owner: { type: GraphQLString },
    uploadDate: { type: GraphQLString },
    originalname: { type: GraphQLString },

    round:{type: GraphQLInt},
    instagram:{ type: GraphQLString },

  }),
});

/*const AllUsers = new GraphQLObjectType({
  name: 'AllUsers',
  fields: () => ({
    userId: { type: GraphQLString },
  })
});*/

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Photos: {
      type: new GraphQLList(PhotoType),
      resolve(parent, args) {
        var params = {
          TableName: "showmethestyle",
        };
        return db
          .scan(params)
          .promise()
          .then((res) => res.Items);
      },
    },
    AllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        var params = {
          TableName: "Users",
        };
        return db
          .scan(params)
          .promise()
          .then((res) => res.Items);
      },
    },
    User: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve(parent, args) {
        var params = {
          TableName: "Users",
          Key: {
            userId: "",
          },
        };

        params.Key.userId = args.userId;

        return db
          .get(params)
          .promise()
          .then((res) => res.Item);
      },
    },
    Contest: {
      type: new GraphQLList(PhotoType),
      args: {
        round: { type: GraphQLInt },
      },
      resolve(parent, args) {
        var params = {
          TableName: "Contest",
          FilterExpression: "round = :round",
          ExpressionAttributeValues: { ":round": args.round },
        };

        return db
          .scan(params)
          .promise()
          .then((res) => res.Items);
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
        userName: { type: GraphQLString },
        userNickName: { type: GraphQLString },
        userInstagram: { type: GraphQLString },
      },
      resolve(parent, args) {
        params = {
          TableName: "Users",
          Item: {
            userId: args.userId,
            userName: args.userName,
            userNickName: args.userNickName,
            userInstagram:args.userInstagram
          },
        };
        return db
          .put(params)
          .promise()
          .then((res) => console.log(res));
      },
    },
    SetUserInfo: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
        userNickName: { type: GraphQLString },
        userInstagram: { type: GraphQLString },
      },
      resolve(parent, args) {
        params = {
          TableName: "Users",
          Key: {
            userId: args.userId,
          },
          UpdateExpression: "set userNickName= :N,userInstagram=:I",
          ExpressionAttributeValues: {
            ":N": args.userNickName,
            ":I": args.userInstagram,
          },
          ReturnValues: "UPDATED_NEW",
        };
        return db.update(params, function (err, data) {
          if (err) {
            console.log("Update Infomation Error");
          } else {
            console.log("UserInfo update Success");
          }
        });
      },
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
            id: args.uploadDate + "-" + args.originalname ,
            uploadDate: args.uploadDate,
            owner: args.owner,
            url:
              "https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/" +
              args.category +
              "/" +
              args.uploadDate +
              "-" +
              args.originalname,
            category: args.category,
          },
        };

        return db
          .put(params)
          .promise()
          .then((res) => res);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
