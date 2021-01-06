const { gql } = require("apollo-server-express");

const typeDefs = gql`

scalar DateTime

type Query {
  
    properties: [Property],
    premisesList: [Premises],
    singleProperty (
      propertyId: Int!
    ): Property!,
    distinctSuburbs: [Suburb],
    distinctRegions: [Region],
}

type Mutation {
 postProperty (

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

deleteProperty (propertyId: Int): Property!

deletePremises (premisesId: Int): Premises!

updateProperty (
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

 """ updateInvestor (investorId: Int!,
   investorName: String,
 commercial: Boolean = false,
  industrial: Boolean = false,
  retail: Boolean = false,
  residential: Boolean = false,
  hotel: Boolean = false,
 
  wc: Boolean = false,
  gau: Boolean = false,
  kzn: Boolean = false,
  allregions: Boolean = false,

contactId: Int,
  contactName: String = "",
  contactPosition: String = "",
  contactOfficeNo: String = "",
 contactMobileNo: String = "",
 contactEmail: String = "",
 minInvest: Int=0,
  maxInvest: Int=100

  listed: Boolean = false,
  unlisted: Boolean = false,
  private: Boolean = false,
  bee: Boolean = false,
  notes: String = "",
 ): Investor!

 deleteInvestor (investorId: Int): Investor!

 postContact (
  contactName: String = "",
  contactPosition: String = "",
  contactOfficeNo: String = "",
 contactMobileNo: String = "",
 contactEmail: String = "",
 investorID: Int
 ): Contact!

 deleteContact (contactID: Int): Contact!

 setPrimaryContact (investorID: Int, contactID: Int): Investor! """

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

`



module.exports = typeDefs;
