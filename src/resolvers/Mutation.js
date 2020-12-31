const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function postProperty(parent, args, context, info) {
  /* const userId = getUserId(context) */

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

      /* investorName: args.investorName,
      commercial: args.commercial,
      industrial: args.industrial,
      residential: args.residential,
      retail: args.retail,
      hotel: args.hotel,
      wc: args.wc,
      gau: args.gau,
      kzn: args.kzn,
      allregions: args.allregions,
      minInvest: args.minInvest,
      maxInvest: args.maxInvest,
      listed: args.listed,
      unlisted: args.unlisted,
      private: args.private,
      bee: args.bee,
      notes: args.notes, */

    }
  })
  /*  context.pubsub.publish("NEW_LINK", newLink) */
  /* console.log(newInvestor.id)

  const newContact = await context.prisma.contact.create({


    data: {
      name: args.contactName,
      position: args.contactPosition,
      officeNo: args.contactOfficeNo,
      mobileNo: args.contactMobileNo,
      email: args.contactEmail,

      investorName: { connect: { id: newInvestor.id } },
    }
  }) */
  /*  context.pubsub.publish("NEW_LINK", newLink) */

  /* return newContact */


  return newProperty

}

async function updateProperty(parent, args, context, info) {
  /* const userId = getUserId(context) */

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
      images:             args.images
    }
  })

  return updatedProperty

}

async function setPrimaryContact(parent, args, context, info) {
  /* const userId = getUserId(context) */

  const investor = await context.prisma.investor.findOne({
    where: {
      id: args.investorID,

    },
    select: {
      id: true,
      investorName: true,
      commercial: true,
      industrial: true,
      residential: true,
      retail: true,
      hotel: true,
      wc: true,
      gau: true,
      kzn: true,
      allregions: true,
      minInvest: true,
      maxInvest: true,
      listed: true,
      unlisted: true,
      private: true,
      bee: true,
      notes: true,
      contacts: {
        include: {
          investorName: true,
        },
      },
    },
  })

  console.log(investor)
  var contactsArray = []
  var selectedContact = investor.contacts.filter(t => {
    if (t)
      return (t.id === args.contactID)
  })
  var otherContacts = investor.contacts.filter(t => {
    if (t)
      return (t.id !== args.contactID)
  })


  contactsArray = [...selectedContact, ...otherContacts]
  const contactsArrayCleaned = contactsArray.map(contact => {
    let formattedContact = {
      name: contact.name,
      position: contact.position,
      email: contact.email,
      officeNo: contact.officeNo,
      mobileNo: contact.mobileNo
    }
    return formattedContact

  })
  console.log(contactsArrayCleaned, "log")

  console.log(investor)
  const delArray = []
  const delMap = await investor.contacts.map((contact, index) => {
    console.log(contact.id)
    delArray[index] = { id: contact.id }
  })

  console.log(delArray)
  const contactDel = await context.prisma.investor.update({
    where: { id: args.investorID },
    data: {
      contacts: {
        delete: delArray,
      },
    },
  })

  

  const updatedInvestor = await context.prisma.investor.update({
    where: { id: args.investorID },
    data: {

     

      contacts: {
        create: contactsArrayCleaned
      }

    }
  })

  return updatedInvestor

}

async function deleteProperty(parent, args, context, info) {
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

  console.log(property)
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

  /* const contactDel = await context.prisma.contact.delete({
    where: { investorID: args.investorId },
  }) */

  const propertyDel = await context.prisma.property.delete({
    where: { propertyId: args.propertyId },
  })



  /* const userId = getUserId(context) */
  return property
}


function postPremises(parent, args, context, info) {
  /* const userId = getUserId(context) */

  const propertyId = args.propertyId

  const newPremises = context.prisma.premises.create({


    data: {

      floor:         args.floor,
      area:          args.area,
      vacant:        args.vacant,
      type:          args.type,
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

      propertyName: { connect: { propertyId: propertyId } },
    }
  })
  /*  context.pubsub.publish("NEW_LINK", newLink) */

  return newPremises
}

async function deletePremises(parent, args, context, info) {

  /*  const contact =  await context.prisma.contact.findOne({
     where: {
       id: args.ContactID
     },
   }).investorName() */


  const contactDel = await context.prisma.premises.delete({
    where: { premisesId: args.premisesId },
  })
  /* const userId = getUserId(context) */
  return contactDel
}

async function updatePremises(parent, args, context, info) {
  /* const userId = getUserId(context) */

  const updatedPremises = await context.prisma.premises.update({
    where: { premisesId: args.premisesId },
    data: {

      floor:         args.floor,
      area:          args.area,
      vacant:        args.vacant,
      type:          args.type,
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



async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10)

  // 2
  const user = await context.prisma.user.create({ data: { ...args, password } })

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}





module.exports = {

  postProperty,
  postPremises,
  deleteProperty,
  deletePremises,
  updateProperty,
  updatePremises,
 /*  
  deleteInvestor,
  deleteContact,
  updateInvestor,
  setPrimaryContact, */
  login,
  signup,
}