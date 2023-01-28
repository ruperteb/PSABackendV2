const { AuthenticationError } = require("apollo-server-errors")

function properties (parent, args, context) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
    return context.prisma.propertyList.findUnique({ where: { propertyListId: parent.propertyListId } }).properties()
  }

  module.exports = {
    properties
    
  }