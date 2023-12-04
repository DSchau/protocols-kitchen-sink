import { Context } from "elysia";
import Cache from "node-cache"
import hash from 'object-hash'
import { github as api } from "../../lib/github";

const cache = new Cache({
  stdTTL: 3600 // 3600s = 1h
})

export async function github(context: Context) {
  const { query } = context;
  try {

    const fullQuery = Object.assign({}, query, {
      owner: "postmanlabs",
      repo: "postman-app-support",
      per_page: 100,
    })

    const queryHash = hash(fullQuery)
    let allIssues: any[] | undefined = cache.get(queryHash)

    if (Array.isArray(allIssues)) {
      return allIssues
    } else {
      allIssues = []
    }

    const issues_iterator = api.paginate.iterator(
      api.rest.issues.listForRepo,
      fullQuery,
    );

    for await (const { data: issues } of issues_iterator) {
      allIssues = allIssues.concat(issues);
    }

    cache.set(queryHash, allIssues)

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
