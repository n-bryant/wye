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
    ownedGames: UserGameConnection
    recentlyPlayedGames: UserGameConnection
  }

  type UserGameConnection {
    edges: [UserGameEdge]
  }

  type UserGameEdge {
    node: GameBasicInfo!
  }

  type GameBasicInfo {
    id: ID!
    name: String
    playtime: Int
    icon: String
    logo: String
    storeUrl: String
  }
`;

module.exports = typeDefs;
