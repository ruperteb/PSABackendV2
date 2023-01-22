function contactsList (parent, args, context) {
    return context.prisma.landlord.findUnique({ where: { landlordId: parent.landlordId } }).contactsList()
  }

  

  module.exports = {
    contactsList,
    
  }