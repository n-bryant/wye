const { ApolloServer } = require("apollo-server");
const SteamUsersAPI = require("./dataSources/SteamUsersAPI");
const SteamPlayerServiceAPI = require("./dataSources/SteamPlayerServiceAPI");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

/**
 * Setup up server configuration, feeding it schema and resolver definitions,
 * as well as setting data sources into context
 * # https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      steamUsersAPI: new SteamUsersAPI(),
      steamPlayerServiceAPI: new SteamPlayerServiceAPI()
    };
  }
});
server.listen().then(({ url }) => console.log(`🚀 Server ready at: ${url}`));
