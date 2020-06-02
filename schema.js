const axios = require('axios');
var AWS = require('aws-sdk');
const path = require('path')


AWS.config.accessKeyId = process.env.aws_access_key_id;
AWS.config.secretAccessKey = process.env.aws_secret_access_key;

AWS.config.region = process.env.region;
console.log(AWS.config.region)
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
    nickName: { type: GraphQLString }    
  })
});
const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  fields: () => ({
    url: { type: GraphQLString },
    category: { type: GraphQLString },
    owner: { type: GraphQLString }
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
console.log(db)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Photos: {
      type: new GraphQLList(PhotoType),
      resolve(parent, args) {
        return axios
          .get('https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/hello')          
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
        console.log(params2)
        return db.get(params2).promise().then(res => res.Item);
      }
    }
  }
});



module.exports = new GraphQLSchema({
  query: RootQuery
})