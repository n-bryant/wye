const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    # query for a single user by ID
    user(userId: ID!): User!
    # query for articles by game ID
    articles(gameId: ID!): ArticleConnection
  }

  #
  # Pagination
  #
  type PageInfo {
    # when paginating forwards, the cursor to continue
    endCursor: String
    # when paginating forwards, are there more items?
    hasNextPage: Boolean
    # total count of nodes
    totalCount: Int
  }

  #
  # User
  #
  type User {
    # user's id
    id: ID!
    # user's avatar name
    avatarName: String
    # url to user's avatar image
    avatarImgUrl: String
    # a user's online status
    onlineStatus: String
    # the time the user was last online
    lastOnlineTime: String
    # url to the user's steam profile page
    profileUrl: String
    # a user's owned games
    ownedGames: UserGameConnection
    # a user's recently played games
    recentlyPlayedGames: UserGameConnection
  }

  type UserGameConnection {
    edges: [UserGameEdge]
  }

  type UserGameEdge {
    node: GameBasicInfo!
  }

  type GameBasicInfo {
    # the game's id
    id: ID!
    # name of the game
    name: String
    # hours a user has played the game
    playtime: Int
    # path to the game's icon image
    icon: String
    # path to the game's logo image
    logo: String
    # url to the game's steam store page
    storeUrl: String
  }

  #
  # Article
  #
  type Article {
    # the article's id
    id: ID!
    # the game id that the article is for
    appId: Int
    # the date the article was released
    printDate: String
    # the title of the article
    title: String
    # the url to the article's source
    url: String
    # the html contents of the article
    contents: String
  }

  type ArticleConnection {
    edges: [ArticleEdge]
  }

  type ArticleEdge {
    node: Article!
  }
`;

module.exports = typeDefs;
