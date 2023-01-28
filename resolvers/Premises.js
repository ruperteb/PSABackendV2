const { AuthenticationError } = require("apollo-server-errors");

function propertyName(parent, args, context) {
  if (context.isAuthenticated === false) {
    throw new AuthenticationError("Not logged in");
  }
  return context.prisma.premises
    .findUnique({ where: { premisesId: parent.premisesId } })
    .propertyName();
}

module.exports = {
  propertyName,
};
