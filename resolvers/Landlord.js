const { AuthenticationError } = require("apollo-server-errors");

function contactsList(parent, args, context) {
  if (context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in");
  }
  return context.prisma.landlord
    .findUnique({ where: { landlordId: parent.landlordId } })
    .contactsList();
}

module.exports = {
  contactsList,
};
