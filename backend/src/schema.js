const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    # query for a single user by ID
    user(userId: ID!): User!
  }

  #
  # User
  #
  type User {
    id: ID!
    avatarName: String
    avatarImgUrl: String
    onlineStatus: String
    lastOnlineTime: String
    profileUrl: String
  }
`;

module.exports = typeDefs;
