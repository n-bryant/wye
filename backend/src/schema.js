const { gql } = require("apollo-server");

const typeDefs = gql`
  enum OrderDirection {
    ASC
    DESC
  }

  enum OrderByField {
    NAME
    FREE_TO_PLAY
    ON_SALE
    DISCOUNT
    FINAL_PRICE
    USER_RATING
    OWNED_BY
    RECENTLY_PLAYED_BY
    HOURS_PLAYED
    PLAYTIME_RECENT
    PLAYTIME_FOREVER
    OWNER_COUNT_MIN
    OWNER_COUNT_MAX
  }

  type Query {
    # query for a single user by ID
    user(userId: ID!): User!
    # query for articles by game ID
    articles(gameId: ID!): [Article]!
    # query for a game by ID
    game(gameId: ID!): Game!
    # query for the background image of the most popular game
    mostPopularBackgroundSrc: String!
    # get the path for a game's highlight trailer
    getHighlightTrailer(gameId: ID!): String!
    # get the top title for the top publishers
    getTopTitleForMostPopularPublishers: [PublisherTopTitle]!
    # query for game recommendations for a list of users with filtering
    recommendations(
      users: [ID]
      filters: FilterInput
      orderBy: [OrderByField!]
      sortOrder: OrderDirection
      first: Int
    ): RecommendationConnection!
  }

  #
  # Pagination
  #
  type PageInfo {
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
    avatarImageUrl: String
    # a user's online status
    onlineStatus: String
    # the time the user was last online
    lastOnlineTime: String
    # url to the user's steam profile page
    profileUrl: String
    # a user's owned games
    ownedGames: [GameBasicInfo]!
    # a user's recently played games
    recentlyPlayedGames: [GameBasicInfo]!
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
    # the article's author
    author: String
    # the title of the article
    title: String
    # the url to the article's source
    url: String
    # the html contents of the article
    contents: String
  }

  #
  # Game
  #
  type Game {
    # detailed data for the game
    details(gameId: ID!): GameDetails!
    # articles relating to the game
    articles(gameId: ID!): [Article]!
  }

  type GameDetails {
    # the game's ID
    id: ID!
    # the game's name
    name: String!
    # the date the game was released
    releaseDate: String!
    # a brief description of the game
    shortDescription: String!
    # information on pricing and current sale details for the game
    price: Price!
    # whether the game has controller support
    controllerSupport: String
    # the game's developers
    developers: [String]!
    # the game's publishers
    publishers: [String]!
    # the game's website
    website: String
    # the platforms the game can run on
    platforms: [String]!
    # requirements details
    requirements: Requirements
    # legal notice for the game
    legalNotice: String
    # the game's metacritic rating and review page location
    metacritic: MetacriticInfo!
    # the categories the game fits into
    categories: [Category]!
    # the game's noted genres
    genres: [Genre]!
    # the header image for the game
    headerImageUrl: String!
    # the hero image for the game
    heroImageUrl: String!
    # the logo image for the game
    logoImageUrl: String!
    # the steam store page's generated background image for the game
    backgroundImageUrl: String!
    # a game's highlighted videos
    highlightedVideos: [Video]!
    # screenshots for the game
    screenshots: [Screenshot]!
    # videos relating to the game
    videos: [Video]!
  }

  type Requirements {
    minimum: String
    recommended: String
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
    # a formatted price
    finalFormatted: String
    # raw initial price
    initialRaw: Int
    # raw final price
    finalRaw: Int
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
    id: ID!
    # url for the screenshot's thumbnail
    thumbnailUrl: String
    # url for the fullsize screenshot
    fullsizeUrl: String
  }

  type Video {
    # the video's ID
    id: ID!
    # the video's title
    title: String!
    # url for the video's thumbnail
    thumbnailUrl: String!
    # url for the full size video
    fullsizeUrl: String!
  }

  type PublisherTopTitle {
    # the publisher's name
    publisher: String!
    # data for the publisher's most popular title
    topTitle: WyeGame!
  }

  #
  # Recommendations
  #
  type Recommendation {
    # the recommended game's details
    game: WyeGame!
    # which users own the recommended game
    ownedBy: [String]
    # which users have recently played the recommended game
    recentlyPlayedBy: [String]
    # data on hours played by user
    playtime: [UserPlaytime]
  }

  type RecommendationsUser {
    # user's steam ID
    id: ID!
    # user's avatar name
    avatarName: String
    # url to user's avatar image
    avatarImageUrl: String
    # a user's online status
    onlineStatus: String
    # the time the user was last online
    lastOnlineTime: String
    # url to the user's steam profile page
    profileUrl: String
  }

  type RecommendationConnection {
    pageInfo: PageInfo
    # details for the users the recommendations are for
    userDetails: [RecommendationsUser]!
    # list of recommendations
    edges: [RecommendationEdge]!
  }

  type RecommendationEdge {
    node: Recommendation!
  }

  type WyeGame {
    # the game's steam app id
    appid: String!
    # the game's name
    name: String!
    # list of the game's developers
    developers: [String]!
    # list of the game's publishers
    publishers: [String]!
    # list of the game's genres
    genres: [String]!
    # list of the game's tags
    tags: [String]!
    # whether the game is free to play or not
    freeToPlay: Boolean!
    # whether the game is on sale
    onSale: Boolean!
    # the sale discount percentage
    discount: Int!
    # the game's price before discount
    initialPrice: Int!
    # the game's price with discount applied
    finalPrice: Int!
    # the game's user rating percentage
    userRating: Int!
    # average playtime in the last 2 weeks in minutes
    playtime2Weeks: Int!
    # playtime since March 2009 in minutes
    playtimeForever: Int!
    # formatted range of owner count
    ownersFormatted: String!
    # max owner count
    ownersMax: Int!
    # min owner count
    ownersMin: Int!
    # location of the game's header image
    headerImage: String!
    # game page background image location
    backgroundImage: String!
    # left broadcast image panel location
    broadcastLeftImage: String
    # right broadcast image panel location
    broadcastRightImage: String
    # location of small capsule
    capsuleSm: String!
    # location of med capsule
    capsuleMd: String!
    # location of lg capsule
    capsuleLg: String!
    # location of the game's logo
    logo: String!
    # location of the game's library capsule image
    libraryCapsule: String!
    # location of the game's library hero image
    libraryHero: String!
  }

  type UserPlaytime {
    # the user's ID
    steamId: String!
    # the user's total game play time in hours
    hoursPlayed: Float!
  }

  input FilterInput {
    # filters based on player info
    playerFilters: PlayerFilters
    # filters based on game info
    gameFilters: GameFilters
  }

  input PlayerFilters {
    # games owned by player(s)
    ownedBy: [String]
    # games recently played by player(s)
    recentlyPlayedBy: [String]
  }

  input GameFilters {
    # list of game IDs to filter for
    appid_in: [String]
    # name contains filter criteria
    name_contains: String
    # list of the publishers to filter for
    publishers_in: [String]
    # list of developers to filter for
    developers_in: [String]
    # list of the genres to filter for
    genres_in: [String]
    # list of tags to filter for
    tags_in: [String]
    # filter value for free to play games
    freeToPlay: Boolean
    # filter value for games that are on sale
    onSale: Boolean
    # filter for games with rating <= value
    userRating_lte: Int
    # filter for games with rating >= value
    userRating_gte: Int
    # filter for games with lower range of owners <= value
    ownersMin_lte: Int
    # filter for games with lower range of owners >= value
    ownersMin_gte: Int
    # filter for games with upper range of owners <= value
    ownersMax_lte: Int
    # filter for games with upper range of owners >= value
    ownersMax_gte: Int
    # fitler for games with discount <= value
    discount_lte: Int
    # fitler for games with discount >= value
    discount_gte: Int
    # fitler for games with price <= value
    finalPrice_lte: Int
    # fitler for games with price >= value
    finalPrice_gte: Int
  }
`;

module.exports = typeDefs;
