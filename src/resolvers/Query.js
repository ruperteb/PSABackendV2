

  async function properties(parent, args, context, info) {
    return context.prisma.property.findMany()
    
  }

  async function singleProperty(parent, args, context, info) {
    return context.prisma.property.findUnique({
      where: {
        propertyId: args.propertyId,
      },
    })
    
  }

  async function premisesList(parent, args, context, info) {
    return context.prisma.premises.findMany()
    
  }

  module.exports = {
    properties,
    premisesList,
    singleProperty,
   
  }