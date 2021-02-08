const dotenv = require('dotenv')
dotenv.config() // Load the environment variables
/* const { GraphQLServer } = require('graphql-yoga') */
const express = require('express');
var cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client')
const typeDefs = require('./schema')

// 1


const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Premises = require('./resolvers/Premises')
const Property = require('./resolvers/Property')
const PropertyList = require('./resolvers/PropertyList')
const Landlord = require('./resolvers/Landlord')
const LandlordContact = require('./resolvers/LandlordContact')
const DateTime = require('./resolvers/DateTime')
/* const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote') */


/* const { PubSub } = require('graphql-yoga') */

const prisma = new PrismaClient()

/* const pubsub = new PubSub() */



// 2

const resolvers = {
    Query,
    Mutation,
    Premises,
    Property,
    Landlord,
    LandlordContact,
    DateTime,
    PropertyList,
    
  }

// 3

/* const opts = {
  port: 4000,
  cors: {
    credentials: true,
    origin: ["http://localhost:3000/"], 
   
  }
}; */

/* server.express.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
}); */


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({req}) => {

    /* const token = request.headers.authorization || '' */
    return {
      ...req,
      prisma,
      token: req.headers.authorization
      
     
    }
  },
})



const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}


/* server.start(opts, () => console.log(`Server is running on http://localhost:4000`)) */

const app = express();
/* app.use(cors()) */

/* app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
}); */



server.applyMiddleware({ app, cors: {credentials: true, origin: true},path:"/" });

const PORT = process.env.PORT || 4000;
 
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);