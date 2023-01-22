const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function postProperty(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const contactId = args.contactId

  const newProperty = await context.prisma.property.create({
    data: {

      propertyName:       args.propertyName,
      address:            args.address,
      suburb:             args.suburb,
      coordinates:        args.coordinates,
      earliestOccupation: args.earliestOccupation,
      earliestExpiry:     args.earliestExpiry,
      erfExtent:          args.erfExtent,
      totalGLA:           args.totalGLA,
      vacantArea:         args.vacantArea,
      buildingType:       args.buildingType,
      province:           args.province,
      region:             args.region,
      notes:              args.notes,

      contact: { connect: { contactId: contactId } },

    }
  })
  
  return newProperty

}

async function updateProperty(parent, args, context, info) {

  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const contactId = args.contactId

  const updatedProperty = await context.prisma.property.update({
    where: { propertyId: args.propertyId },
    data: {

      propertyName:       args.propertyName,
      address:            args.address,
      suburb:             args.suburb,
      coordinates:        args.coordinates,
      earliestOccupation: args.earliestOccupation,
      earliestExpiry:     args.earliestExpiry,
      erfExtent:          args.erfExtent,
      totalGLA:           args.totalGLA,
      vacantArea:         args.vacantArea,
      buildingType:       args.buildingType,
      province:           args.province,
      region:             args.region,
      notes:              args.notes,

      locality:           args.locality,
      aerial:             args.aerial,
      images:             args.images,

      contact: { connect: { contactId: contactId } },
    }
  })

  return updatedProperty

}


async function deleteProperty(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  const property = await context.prisma.property.findUnique({
    where: {
      propertyId: args.propertyId,

    },
    select: {
      propertyId: true,
      propertyName: true,
      premisesList: {
        include: {
          propertyName: true,
        },
      },
    },
  })

  const delArray = []
  const delMap = await property.premisesList.map((premises, index) => {
    console.log(premises.premisesId)
    delArray[index] = { premisesId: premises.premisesId }
  })

  console.log(delArray)
  const premisesDel = await context.prisma.property.update({
    where: { propertyId: args.propertyId },
    data: {
      premisesList: {
        delete: delArray,
      },
    },
  })


  const propertyDel = await context.prisma.property.delete({
    where: { propertyId: args.propertyId },
  })


  return property
}

async function deleteLandlord(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }
  const landlord = await context.prisma.landlord.findUnique({
    where: {
      landlordId: args.landlordId,

    },
    select: {
      landlordId: true,
      landlordName: true,
      contactsList: {
        include: {
          landlordName: true,
        },
      },
    },
  })

  
  const delArray = []
  const delMap = await landlord.contactsList.map((contact, index) => {
    
    delArray[index] = { contactId: contact.contactId }
  })

  
  const contactDel = await context.prisma.landlord.update({
    where: { landlordId: args.landlordId },
    data: {
      contactsList: {
        delete: delArray,
      },
    },
  })

  const landlordDel = await context.prisma.landlord.delete({
    where: { landlordId: args.landlordId },
  })

  return landlord
}

async function deleteLandlordContact(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const contactDel = await context.prisma.landlordContact.delete({
    where: { contactId: args.contactId },
  })
  
  return contactDel
}


function postPremises(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const propertyId = args.propertyId

  const newPremises = context.prisma.premises.create({


    data: {

      floor:         args.floor,
      area:          args.area,
      vacant:        args.vacant,
      type:          args.type,
      occupation:    args.occupation,
      premisesIndex: args.premisesIndex,
      premisesNotes: args.premisesNotes,
      netRental:     args.netRental,
      opCosts:       args.opCosts,
      other:         args.other,
      grossRental:   args.grossRental,
      esc:           args.esc,
      openBays:      args.openBays,
      openRate:      args.openRate,
      coveredBays:   args.coveredBays,
      coveredRate:   args.coveredRate,
      shadedBays:    args.shadedBays,
      shadedRate:    args.shadedRate,
      parkingRatio:  args.parkingRatio,
      tenantName:    args.tenantName,
      leaseExpiry:   args.leaseExpiry,
      tenantNotes:   args.tenantNotes,
      yard:          args.yard,
      height:        args.height,
      doors:         args.doors,
      loading:       args.loading,
      sprinklered:   args.sprinklered,
      canopies:      args.canopies,
      power:         args.power,

      propertyName: { connect: { propertyId: propertyId } },
    }
  })
  

  return newPremises
}

async function deletePremises(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }


  const premisesDel = await context.prisma.premises.delete({
    where: { premisesId: args.premisesId },
  })
  
  return premisesDel
}

async function updatePremises(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const updatedPremises = await context.prisma.premises.update({
    where: { premisesId: args.premisesId },
    data: {

      floor:         args.floor,
      area:          args.area,
      vacant:        args.vacant,
      type:          args.type,
      premisesIndex: args.premisesIndex,
      occupation:    args.occupation,
      premisesNotes: args.premisesNotes,
      netRental:     args.netRental,
      opCosts:       args.opCosts,
      other:         args.other,
      grossRental:   args.grossRental,
      esc:           args.esc,
      openBays:      args.openBays,
      openRate:      args.openRate,
      coveredBays:   args.coveredBays,
      coveredRate:   args.coveredRate,
      shadedBays:    args.shadedBays,
      shadedRate:    args.shadedRate,
      parkingRatio:  args.parkingRatio,
      tenantName:    args.tenantName,
      leaseExpiry:   args.leaseExpiry,
      tenantNotes:   args.tenantNotes,
      yard:          args.yard,
      height:        args.height,
      doors:         args.doors,
      loading:       args.loading,
      sprinklered:   args.sprinklered,
      canopies:      args.canopies,
      power:         args.power,

    }
  })

  return updatedPremises

}

async function postLandlord(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const newLandlord = await context.prisma.landlord.create({
    data: {
      landlordName:       args.landlordName,
    }
  })
  return newLandlord
}

async function updateLandlord(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const updatedLandlord = await context.prisma.landlord.update({
    where: {landlordId: args.landlordId},
    data: {
      landlordName:       args.landlordName,
    }
  })
  return updatedLandlord
}

function postLandlordContact(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const landlordId = args.landlordId

  const newContact = context.prisma.landlordContact.create({


    data: {

      name:         args.name,
      email:          args.email,
      officeNo:        args.officeNo,
      mobileNo:          args.mobileNo,
     
      landlordName: { connect: { landlordId: landlordId } },
    }
  })

  return newContact
}

async function updateLandlordContact(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const updatedLandlordContact = await context.prisma.landlordContact.update({
    where: {contactId: args.contactId},
    data: {
      name:         args.name,
      email:          args.email,
      officeNo:        args.officeNo,
      mobileNo:          args.mobileNo,
    }
  })
  return updatedLandlordContact
}

async function postPropertyList(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const propertyIdArray = args.propertyIdList.map((id) => {
return {propertyId: id}

  })

  const newPropertyList = await context.prisma.propertyList.create({
    data: {
      enquiryName:       args.enquiryName,
      customTitle:       args.customTitle,
      enquiryDate:       args.enquiryDate,
      properties:      {connect: propertyIdArray},
    }
  }, info)
  return newPropertyList
}

async function updatePropertyList(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const propertyIdArray = args.propertyIdList.map((id) => {
    return {propertyId: id}
    
      })

  const updatedPropertyList = await context.prisma.propertyList.update({


    
    where: {propertyListId: args.propertyListId},
    data: {
      enquiryName:       args.enquiryName,
      customTitle:       args.customTitle,
      enquiryDate:       args.enquiryDate,
      properties:      {set: propertyIdArray},
    }
  }, info)
  return updatedPropertyList
}

async function deletePropertyList(parent, args, context, info) {
  if(context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in")
  }

  const propertyListDel = await context.prisma.propertyList.delete({
    where: { propertyListId: args.propertyListId },
  })
  
  return propertyListDel
}

/* async function login(parent, args, context, info) {
  
  
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  
  return {
    token,
    user,
  }
} */

/* async function signup(parent, args, context, info) {
  
  const password = await bcrypt.hash(args.password, 10)

  
  const user = await context.prisma.user.create({ data: { ...args, password } })

  
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  
  return {
    token,
    user,
  }
} */





module.exports = {

  postProperty,
  postPremises,
  deleteProperty,
  deletePremises,
  updateProperty,
  updatePremises,
  postLandlord,
  postLandlordContact,
  deleteLandlord,
  deleteLandlordContact,
  updateLandlord,
  updateLandlordContact,
  postPropertyList,
  updatePropertyList,
  deletePropertyList,
  
  /* login,
  signup, */
}