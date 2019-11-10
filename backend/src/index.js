const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    user(userId: String!): User!
  }

  type User {
    id: ID!
  }
`;

const resolvers = {
  Query: {
    user: async (_source, { userId }, { dataSources }) => {
      return dataSources.steamUsersAPI.getUserSummaryById(userId);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      steamUsersAPI: new steamUsersAPI()
    };
  }
});
server.listen().then(({ url }) => console.log(`🚀 Server ready at: ${url}/`));
