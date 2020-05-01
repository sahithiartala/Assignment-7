/* eslint linebreak-style: ["error", "windows"] */

/* eslint no-restricted-globals: "off" */

const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const product = require('./product.js');
const about = require('./about.js');

const resolvers = {
  Query: {

    about: about.getMessage,
    productList: product.list,
    Product: product.get,
    productsCount: product.count,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    addProduct: product.add,
    productDelete: product.remove,
    productUpdate: product.update,
  },
};
const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});
function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}
module.exports = { installHandler };
