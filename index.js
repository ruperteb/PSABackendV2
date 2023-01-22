const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
var cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("./validate");
const typeDefs = require("./schema");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Premises = require("./resolvers/Premises");
const Property = require("./resolvers/Property");
const PropertyList = require("./resolvers/PropertyList");
const Landlord = require("./resolvers/Landlord");
const LandlordContact = require("./resolvers/LandlordContact");
const DateTime = require("./resolvers/DateTime");

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Premises,
  Property,
  Landlord,
  LandlordContact,
  DateTime,
  PropertyList,
};

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: async ({ req }) => {
      let isAuthenticated = false;
      try {
        const authHeader = req.headers.authorization || "";

        if (authHeader) {
          const token = authHeader.split(" ")[1];
          const payload = await verifyToken(token);
          isAuthenticated = payload ? true : false;
        }
      } catch (error) {
        console.error("Not Authorised");
      }

      return {
        ...req,
        prisma,
        token: req.headers.authorization,
        isAuthenticated,
      };
    },
  });

  /* const corsOptions = {
    origin: ["http://localhost:3000/"],
    credentials: true,
  }; */

  var corsOptions = {
    origin: ["http://localhost:3000", "https://d2bnd9wi3qfdme.cloudfront.net"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  };

  var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Accept, X-Requested-With"
    );
    res.header("Allow", "GET,PUT,POST,DELETE,OPTIONS");
    next();
  };

  const app = express();

  app.use(cors(corsOptions));
  app.use(allowCrossDomain);

  await server.start();

  server.applyMiddleware({
    app,
    cors: /* { credentials: true, origin: true } */ false,
    path: "/",
  });

  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  return { server, app };
};

startApolloServer();
