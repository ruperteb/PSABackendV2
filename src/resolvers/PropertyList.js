function properties (parent, args, context) {
    return context.prisma.propertyList.findUnique({ where: { propertyListId: parent.propertyListId } }).properties()
  }

  module.exports = {
    properties
    
  }