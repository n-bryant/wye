const { gql } = require("apollo-server");

const typeDefs = gql`
  enum OrderDirection {
    ASCENDING
    DESCENDING
  }

  type Query {
    # query for a single user by ID
    user(userId: ID!): User!
    # query for articles by game ID
    articles(gameId: ID!): ArticleConnection
    # query for a game by ID
    game(gameId: ID!): Game
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
    pageInfo: PageInfo
    edges: [ArticleEdge]
  }

  type ArticleEdge {
    node: Article!
  }

  #
  # Game
  #
  type Game {
    # detailed data for the game
    details(gameId: ID!): GameDetails
    # articles relating to the game
    articles(
      gameId: ID!
      first: Int!
      orderBy: OrderDirection
    ): ArticleConnection
  }

  type GameDetails {
    # the game's ID
    id: ID!
    # the date the game was released
    releaseDate: String
    # a brief description of the game
    shortDescription: String
    # information on pricing and current sale details for the game
    price: Price
    # whether the game has controller support
    controllerSupport: Boolean
    # the game's developers
    developers: [String]
    # the game's publishers
    publishers: [String]
    # the game's website
    website: String
    # the platforms the game can run on
    platforms: [String]
    # the game's metacritic rating and review page location
    metacritic: MetacriticInfo
    # the categories the game fits into
    categories: [Category]
    # the game's noted genres
    genres: [Genre]
    # the header image for the game
    headerImgUrl: String
    # the hero image for the game
    heroImageUrl: String
    # the logo image for the game
    logoImgUrl: String
    # the steam store page's generated background image for the game
    backgroundImgUrl: String
    # screenshots for the game
    screenshots: [Screenshot]
    # videos relating to the game
    videos: [Video]
  }

  type Price {
    # whether the game is free to play
    freeToPlay: Boolean
    # whether the game is on sale or not
    onSale: Boolean
    # the percentage of a sale's discount
    discountPercentage: Int
    # a formatted initial price before a sale price
    initialFormatted: String
    # a formatted sale price
    finalFormatted: String
  }

  type MetacriticInfo {
    # the game's metacritic score
    score: Int
    # location of the game's metacritic review page
    reviewsPageUrl: String
  }

  type Category {
    # the category's ID
    id: ID
    # the category's description
    description: String
  }

  type Genre {
    # the genre's ID
    id: ID
    # the genre's description
    description: String
  }

  type Screenshot {
    # the screenshot's ID
    id: ID
    # url for the screenshot's thumbnail
    thumbnailUrl: String
    # url for the fullsize screenshot
    fullsizeUrl: String
  }

  type Video {
    # the video's ID
    id: ID
    # the video's title
    title: String
    # url for the video's thumbnail
    thumbnailUrl: String
    # url for the full size video
    fullsizeUrl: String
  }
`;

module.exports = typeDefs;
