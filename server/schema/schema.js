const graphql = require('graphql');
const _ = require('lodash');


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// dummy data 
const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Hero Of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
];

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const AuthorType = new GraphQLObjectType({
   name: 'Author', 
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       age: { type: GraphQLInt },
       books: {
           type: new GraphQLList(BookType),
           resolve(parent, args) {
               return _.filter(books, { authorId: parent.id })
           }
       }
   })
});

// book type with different fields
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       genre: { type: GraphQLString },
       author: {
           type: AuthorType,
           resolve(parent) { 
               console.log(parent);
               return _.find(authors, { id: parent.authorId })
           }
       }
   }) 
});

// define rootquery how we initally jump into the graph 
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
        // {
        //   book(id: 2){
        //     name
        //     genre
        //     author{
        //       name
        //       age
        //       id
        //     }
        //   }
        // }
       book: {
           type: BookType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               //code to get data from db/other source
               return _.find(books, { id: args.id });
           }
       },
        // {
        //   author(id: 2){
        //     name
        //     age
        //     books{
        //       name
        //     }
        //   }
        // }
       author: {
           type: AuthorType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return _.find(authors, { id: args.id });
           }
       },
        // {
        //   books{
        //     name
        //     author{
        //       name
        //     }
        //   }
        // }
       books: {
           type: new GraphQLList(BookType),
           resolve() {
               return books
           }
       },
        // {
        //   authors{
        //    name
        //    books{
        //      name
        //    }
        //   }
        // }
       authors: {
           type: new GraphQLList(AuthorType),
           resolve() {
               return authors
           }
       }
   } 
});

module.exports = new GraphQLSchema({
   query: RootQuery 
});