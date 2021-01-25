

  async function properties(parent, args, context, info) {
    return context.prisma.property.findMany()
    
  }

  async function landlords(parent, args, context, info) {
    return context.prisma.landlord.findMany()
    
  }

  async function landlordContacts(parent, args, context, info) {
    return context.prisma.landlordContact.findMany()
    
  }

  async function contactsByLandlord(parent, args, context, info) {
    return context.prisma.landlordContact.findMany({
      where: {
        landlordName: {
          landlordId: args.landlordId
        }
      },
    })
    
  }

  async function singleProperty(parent, args, context, info) {
    return context.prisma.property.findUnique({
      where: {
        propertyId: args.propertyId,
      },
    })
    
  }

  async function multiProperty(parent, args, context, info) {
    return context.prisma.property.findMany({
      where: {
        propertyId: { in: args.propertyIdList}
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
    multiProperty,
    landlords,
    landlordContacts,
    distinctSuburbs,
    distinctRegions,
    contactsByLandlord
   
  }