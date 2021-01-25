function premisesList (parent, args, context) {
    return context.prisma.property.findUnique({ where: { propertyId: parent.propertyId } }).premisesList()
  }

  function contact (parent, args, context) {
    return context.prisma.property.findUnique({ where: { propertyId: parent.propertyId } }).contact()
  }

  

  module.exports = {
    premisesList,
    contact
    
  }
