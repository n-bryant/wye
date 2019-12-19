const { ApolloServer } = require("apollo-server");
require("dotenv").config({ path: "variables.env" });
const SteamUsersAPI = require("./dataSources/SteamUsersAPI");
const SteamPlayerServiceAPI = require("./dataSources/SteamPlayerServiceAPI");
const SteamNewsAPI = require("./dataSources/SteamNewsAPI");
const SteamGamesAPI = require("./dataSources/SteamGamesAPI");
const WyeGamesAPI = require("./dataSources/WyeGamesAPI");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

/**
 * Setup up server configuration, feeding it schema and resolver definitions,
 * as well as setting data sources into context
 * # https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
const server = new ApolloServer({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  },
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      steamUsersAPI: new SteamUsersAPI(),
      steamPlayerServiceAPI: new SteamPlayerServiceAPI(),
      steamNewsAPI: new SteamNewsAPI(),
      steamGamesAPI: new SteamGamesAPI(),
      wyeGamesAPI: new WyeGamesAPI()
    };
  }
});
server.listen().then(({ url }) => console.log(`🚀 Server ready at: ${url}`));
