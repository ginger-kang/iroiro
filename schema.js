const axios = require('axios');

const {  
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

//Launch Type
const photos = new GraphQLObjectType({
  name: 'photo',
  fields: () => ({
    url: { type: GraphQLString },
    category: { type: GraphQLString },
    owner: { type: GraphQLString }    
  })
});



//루트 쿼리

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