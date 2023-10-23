import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars"
import { github as api } from "../../lib/github"

export const graphql = {
    typeDefs: /* GraphQL */ `
    ${DateTimeTypeDefinition}
    type User {
      login: String!
      id: ID!

      html_url: String!
      url:  String!
    }
    type Issue {
      url: String!
      repository_url: String!
      labels_url: String!
      comments_url: String!
      events_url: String!
      html_url: String!

      id: ID!
      title: String!
      body: String!
      number: Int!

      user: User!
      state: String!
      created_at: DateTime!
      updated_at: DateTime!
    }
    type Query {
      hello(name: String!): String!
      ping: String!
      greetings: String
      greetingsOld: String @deprecated

      issues(labels: String, since: String): [Issue]!
    }
  `,
  resolvers: {
    DateTime: DateTimeResolver,
    Query: {
      hello: (_: any, args: { name: string }) => {
        return `Hello ${args.name}`
      },
      ping: () => `pong`,
      greetings: () => 'Hello from Yoga in a Bun app!',
      greetingsOld: () => 'Hello from Yoga in a Bun app!',
      issues: async (_, query) => {
        let allIssues: any[] = []
        const issues_iterator = api.paginate.iterator(api.rest.issues.listForRepo, Object.assign({}, query, {
          owner: "postmanlabs",
          repo: "postman-app-support",
          per_page: 100,
        }))
    
        for await (const { data: issues } of issues_iterator) {
          allIssues = allIssues.concat(issues)
        }

        console.log(allIssues[0])
    
        return allIssues
      }
    }
  }
}
