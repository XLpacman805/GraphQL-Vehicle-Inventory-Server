const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const typeDefs = gql(fs.readFileSync('./schema.graphql', 'utf8'));
const inventory = require('./inventory').inventory;


const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: () => ({
      id: 1,
      username: "tom"
    }),
    vehicle: (root, args) => {
      console.log(args);
      return inventory[args.vin];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);