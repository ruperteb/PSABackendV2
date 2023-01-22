function propertyName (parent, args, context) {
    return context.prisma.premises.findUnique({ where: { premisesId: parent.premisesId } }).propertyName()
  }

  module.exports = {
    propertyName,
    
  }