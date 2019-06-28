const config = require('./config');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// const { db: { host, port, name, username, password } } = config;

mongoose.connect(`mongodb://mo:test123@ds261116.mlab.com:61116/gql-ninja`);
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
