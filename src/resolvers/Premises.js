function propertyName (parent, args, context) {
    return context.prisma.premises.findOne({ where: { premisesId: parent.premisesId } }).propertyName()
  }

  module.exports = {
    propertyName,
    
  }