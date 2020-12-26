

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

  async function distinctSuburbs(parent, args, context, info) {

  const distinctSuburbs = context.prisma.property.findMany({
    select: {
      suburb: true,
      province: true,
    },
    distinct: ["suburb", "province"],
  });

  return distinctSuburbs
}

async function distinctRegions(parent, args, context, info) {

  const distinctRegions = context.prisma.property.findMany({
    select: {
      region: true,
      province: true,
    },
    distinct: ["region", "province"],
  });

  return distinctRegions
}

  module.exports = {
    properties,
    premisesList,
    singleProperty,
    distinctSuburbs,
    distinctRegions
   
  }