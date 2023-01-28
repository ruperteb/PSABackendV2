const { AuthenticationError } = require("apollo-server-errors")

function premisesList (parent, args, context) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
    return context.prisma.property.findUnique({ where: { propertyId: parent.propertyId } }).premisesList()
  }

  function contact (parent, args, context) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findUnique({ where: { propertyId: parent.propertyId } }).contact()
  }

  

  module.exports = {
    premisesList,
    contact
    
  }
