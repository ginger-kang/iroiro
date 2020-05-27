const express = require('express');
const graphqlHTTP = require('express-graphql');
const path=require('path')
const schema = require('./schema');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.static('dist'))
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on ${PORT}`));
