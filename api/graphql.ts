export default {
    typeDefs: /* GraphQL */ `
    type Query {
      hello(name: String!): String!
      greetings: String
      greetingsOld: String @deprecated
    }
  `,
  resolvers: {
    Query: {
      hello: (_: any, args: { name: string }) => {
        return `Hello ${args.name}`
      },
      greetings: () => 'Hello from Yoga in a Bun app!',
      greetingsOld: () => 'Hello from Yoga in a Bun app!'
    }
  }
}
