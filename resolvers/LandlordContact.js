function landlordName (parent, args, context) {
    return context.prisma.landlordContact.findUnique({ where: { contactId: parent.contactId } }).landlordName()
  }

  function propertyList (parent, args, context) {
    return context.prisma.landlordContact.findUnique({ where: { contactId: parent.contactId } }).propertyList()
  }

  module.exports = {
    landlordName,
    propertyList
    
  }