/* import { GraphQLDateTime } from "graphql-iso-date"; */
const GraphQLDateTime = require('graphql-iso-date');

const dateTimeResolver = {
  DateTime: GraphQLDateTime
};

/* export default [
    dateTimeResolver,
  
]; */

module.exports = {
    dateTimeResolver,
    
  }