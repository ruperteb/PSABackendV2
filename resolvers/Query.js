const { AuthenticationError } = require("apollo-server-errors")


  async function properties(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findMany({
      orderBy: {
        propertyName: 'asc',
      },
    })
    
  }

  async function landlords(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.landlord.findMany({
      orderBy: {
        landlordName: 'asc',
      },
    })
    
  }

  async function landlordContacts(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.landlordContact.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    
  }

  async function contactsByLandlord(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.landlordContact.findMany({
      where: {
        landlordName: {
          landlordId: args.landlordId
        }
      },
    })
    
  }

  async function singleProperty(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findUnique({
      where: {
        propertyId: args.propertyId,
      },
    })
    
  }

  async function multiProperty(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.property.findMany({
      where: {
        propertyId: { in: args.propertyIdList}
      },
      orderBy: {
        propertyName: 'asc',
      },
    })
    
  }


  async function premisesList(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }
    return context.prisma.premises.findMany({
      orderBy: {
        floor: 'asc',
      },
    })
    
  }

  async function distinctSuburbs(parent, args, context, info) {
    if(context.isAuthenticated === false) {
      throw new AuthenticationError("Not logged in")
    }

  const distinctSuburbs = context.prisma.property.findMany({
      orderBy: {
        suburb: 'asc',
      },
    select: {
      suburb: true,
      province: true,
    },
    distinct: ["suburb", "province"],
  });

  return distinctSuburbs
}

async function distinctRegions(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const distinctRegions = context.prisma.property.findMany({
    orderBy: {
      region: 'asc',
    },
    select: {
      region: true,
      province: true,
    },
    distinct: ["region", "province"],
  });

  return distinctRegions
}

async function propertyLists(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  return context.prisma.propertyList.findMany({
    orderBy: {
      enquiryName: 'asc',
    },
  })
  
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
    contactsByLandlord,
    propertyLists
   
  }