

  async function properties(parent, args, context, info) {
    return context.prisma.property.findMany()
    
  }

  async function premisesList(parent, args, context, info) {
    return context.prisma.premises.findMany()
    
  }

  module.exports = {
    properties,
    premisesList,
   
  }