import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import { github as api } from "../../lib/github";

const FRAGMENTS = `
  fragment IssueBody on Issue {
    url: String
    repository_url: String
    labels_url: String
    comments_url: String
    events_url: String
    html_url: String
  }
`

export const graphql = {
  typeDefs: /* GraphQL */ `
    ${DateTimeTypeDefinition}
    type User {
      login: String!
      id: ID!

      html_url: String!
      url: String!
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
  
    fragment IssueBody on Issue {
      url: String
      repository_url: String
      labels_url: String
      comments_url: String
      events_url: String
      html_url: String
    }
  
    type Query {
      """
      Just say hello! Very simple.
      """
      hello(name: String!): String!
      """
      Test for a valid response. The health-check.
      """
      ping: String!
      """
      A less sophisticated way to say hello.
      """
      greetings: String
      greetingsOld: String @deprecated
      """
      GitHub issues support!
      """
      issues(labels: String, since: String): [Issue]!
    }

  `,
  resolvers: {
    DateTime: DateTimeResolver,
    Query: {
      hello: (_: any, args: { name: string }) => {
        return `Hello ${args.name}`;
      },
      ping: () => `pong`,
      greetings: () => "Hello from Yoga in a Bun app!",
      greetingsOld: () => "Hello from Yoga in a Bun app!",
      issues: async (_, query) => {
        let allIssues: any[] = [];
        const issues_iterator = api.paginate.iterator(
          api.rest.issues.listForRepo,
          Object.assign({}, query, {
            owner: "postmanlabs",
            repo: "postman-app-support",
            per_page: 100,
          }),
        );

        for await (const { data: issues } of issues_iterator) {
          allIssues = allIssues.concat(issues);
        }

        return allIssues;
      },
    },
  },
};
