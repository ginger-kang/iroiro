const axios = require('axios');

const {  
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const photos = new GraphQLObjectType({
    name: 'photos',
  fields: () => ({
    url: { type: GraphQLString },
    category: { type: GraphQLString },
    owner: { type: GraphQLString }   
  })
});


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        photos:{
            type:new GraphQLList(photos),
            resolve(parent,args){
                return axios
                .get('https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/hello')
                .then(res=>res.data);
            }
        },
       
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
})