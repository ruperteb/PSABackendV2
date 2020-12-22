function premisesList (parent, args, context) {
    return context.prisma.property.findOne({ where: { propertyId: parent.propertyId } }).premisesList()
  }

  

  module.exports = {
    premisesList,
    
  }
