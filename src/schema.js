const { gql } = require("apollo-server-express");

const typeDefs = gql`

scalar DateTime

type Query {
  
    properties: [Property],
    premisesList: [Premises],
    singleProperty (
      propertyId: Int!
    ): Property!,
    multiProperty (
      propertyIdList: [Int]
    ): [Property],
    landlords: [Landlord],
    landlordContacts: [LandlordContact],
    distinctSuburbs: [Suburb],
    distinctRegions: [Region],
    contactsByLandlord (
      landlordId: Int!
    ): [LandlordContact],
}

type Mutation {
 postProperty (

  contactId: Int

  propertyName:       String!,
  address:            String,
  suburb:             String,
  coordinates:        String,
  earliestOccupation: DateTime,
  earliestExpiry:     DateTime,
  erfExtent:          Float,
  totalGLA:           Float,
  vacantArea:         Float,
  buildingType:       String,
  province:           String,
  region:             String,
  notes:              String,


 ): Property!

 postPremises (

  propertyId: Int!

  floor:         String,
area:          Float,
vacant:        String,
type:          String,
occupation:    DateTime,
premisesIndex: Int,
premisesNotes: String,
netRental:     Float,
opCosts:       Float,
other:         Float,
grossRental:   Float,
esc:           Float,
openBays:      Float,
openRate:      Float,
coveredBays:   Float,
coveredRate:   Float,
shadedBays:    Float,
shadedRate:    Float,
parkingRatio:  Float,
tenantName:    String,
leaseExpiry:   DateTime,
tenantNotes:   String,
yard:          Float,
height:        Float,
doors:         Float,
loading:       String,
sprinklered:   String,
canopies:      String,
power:         String,

): Premises!


postLandlord (

landlordName:       String,

): Landlord!

postLandlordContact (

landlordId: Int!

name:         String,
email:          String,
officeNo:        String,
mobileNo:          String,


): LandlordContact!


deleteProperty (propertyId: Int): Property!

deletePremises (premisesId: Int): Premises!

deleteLandlord (landlordId: Int): Landlord!

deleteLandlordContact (contactId: Int): LandlordContact!

deletePropertyList (propertyListId: Int): PropertyList!

updateProperty (
  contactId: Int

propertyId:         Int!
propertyName:       String,
address:            String,
suburb:             String,
coordinates:        String,
earliestOccupation: DateTime,
earliestExpiry:     DateTime,
erfExtent:          Float,
totalGLA:           Float,
vacantArea:         Float,
buildingType:       String,
province:           String,
region:             String,
notes:              String,
images:             [String]


): Property!

updatePremises (
premisesId:         Int!
floor:         String,
area:          Float,
vacant:        String,
type:          String,
occupation:    DateTime,
premisesIndex: Int,
premisesNotes: String,
netRental:     Float,
opCosts:       Float,
other:         Float,
grossRental:   Float,
esc:           Float,
openBays:      Float,
openRate:      Float,
coveredBays:   Float,
coveredRate:   Float,
shadedBays:    Float,
shadedRate:    Float,
parkingRatio:  Float,
tenantName:    String,
leaseExpiry:   DateTime,
tenantNotes:   String,
yard:          Float,
height:        Float,
doors:         Float,
loading:       String,
sprinklered:   String,
canopies:      String,
power:         String,


): Premises!

updateLandlord (
landlordId:         Int!,
landlordName:       String,

): Landlord!

updateLandlordContact (
contactId:         Int!,
name:              String,
email:             String,
officeNo:          String,
mobileNo:          String,

): LandlordContact!

postPropertyList (

enquiryName:       String,
enquiryDate:       DateTime,

propertyList:     [Property]

): PropertyList!

updatePropertyList (

propertyListId:  Int!,

enquiryName:       String,
enquiryDate:       DateTime,

propertyList:     [Property]

): PropertyList!

 

  login (email: String!, password: String!): AuthPayload

   signup(email: String!, password: String!, name: String!): AuthPayload

}

type Property {
  propertyId:         Int!

  propertyName:       String!
  address:            String
  suburb:             String
  coordinates:        String
  earliestOccupation: DateTime
  earliestExpiry:     DateTime
  erfExtent:          Float
  totalGLA:           Float
  vacantArea:         Float
  buildingType:       String
  province:           String
  region:             String
  notes:              String

  premisesList:       [Premises]
  images:             [String]

  contact: LandlordContact



  
  
}

type Premises {
 
premisesId: Int 

floor:         String
area:          Float
vacant:        String
type:          String
occupation:    DateTime
premisesIndex: Int
premisesNotes: String
netRental:     Float
opCosts:       Float
other:         Float
grossRental:   Float
esc:           Float
openBays:      Float
openRate:      Float
coveredBays:   Float
coveredRate:   Float
shadedBays:    Float
shadedRate:    Float
parkingRatio:  Float
tenantName:    String
leaseExpiry:   DateTime
tenantNotes:   String
yard:          Float
height:        Float
doors:         Float
loading:       String
sprinklered:   String
canopies:      String
power:         String
propertyName: Property
 
}

type AuthPayload {
 token: String
 user: User
}

type User {
 id: ID!
 name: String!
 email: String!
 
}

type Suburb {
  suburb: String
  province: String
 }

 type Region {
  region: String
  province: String
 }


 type Landlord {
 landlordId: Int!
 landlordName: String
 
 contactsList:   [LandlordContact]
}

type LandlordContact {
  contactId:       Int!
  name:     String 
  email:     String
  officeNo:     String 
  mobileNo:     String 

  landlordName: Landlord 
  propertyList: [Property]
}

type PropertyList {
  propertyListId:       Int!
  enquiryName:     String 
  enquiryDate:     DateTime
  
  propertyList: [Property]
}





`



module.exports = typeDefs;
