const { AuthenticationError } = require("apollo-server-errors")

function landlordName (parent, args, context) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
    return context.prisma.landlordContact.findUnique({ where: { contactId: parent.contactId } }).landlordName()
  }

  function propertyList (parent, args, context) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.landlordContact.findUnique({ where: { contactId: parent.contactId } }).propertyList()
  }

  module.exports = {
    landlordName,
    propertyList
    
  }