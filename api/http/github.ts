import { Context } from "elysia";
import { github as api } from "../../lib/github";

export async function github(context: Context) {
  const { query } = context;
  try {
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

    return {
      count: allIssues.length,
      issues: allIssues,
    };
  } catch (e) {
    context.set.status = 500;
    return {
      error: e,
      errorMessage: e.message,
      stack: e.stack,
    };
  }
}
