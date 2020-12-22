function premisesList (parent, args, context) {
    return context.prisma.property.findUnique({ where: { propertyId: parent.propertyId } }).premisesList()
  }

  

  module.exports = {
    premisesList,
    
  }
