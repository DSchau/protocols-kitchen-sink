import { Context } from "elysia";
import Cache from 'node-cache'
import objectHash from "object-hash"

import { ai, DEFAULT_OPTIONS } from '../../lib/openai'
import { ChatCompletion } from "openai/resources";

const cache = new Cache({
  stdTTL: 43200 // 43200s = 1 day
})

const PRIORITIZATION_SCHEMA = [
  `Your goal is to help the team prioritize across a few different facets, specifically:
   - 💡 Features
   - 🐛 Bugs

  Some of these are subjective, so I'd urge you to consider the following:

  - Something is a feature if it's a new request for something that does not exist today
  - Something is a bug if it is blocking a user in some way, or it is causing a user to not be able to complete their core job

  For all of them, I'd ask that you prioritize the list of issues and include the following metadata when capturing the categories:

  - How long has the issue been opened?
  - When was the last reply?
  - How many reactions does the issue have? (more reactions indicate stronger pain and a need to prioritize more highly)
  `
]

const OUTPUT_FORMAT = [
  `Please include a summary of the issues that will be provided below with the following format (as Markdown):
  
  ## Weekly Report (Week of {REPLACE_WITH_NOW})

  This week {COUNT_OF_ISSUES} were opened in the [postmanapp-support](https://github.com/postmanlabs/postmanapp-support) repository.

  ## 💡 Feature requests ({COUNT_OF_FEATURES} requests)

  {1-2 sentence SUMMARY_OF_OPEN_FEATURE_REQUESTS}

  - [{FEATURE_TITLE}]({LINK_TO_FEATURE})
    - Opened: {DATE_OPENED}
    - Replies: {NUM_COMMENTS}
    - Reactions: {COUNT_OF_REACTIONS}

  ## 🐛 Bugs ({COUNT_OF_BUGS} bugs)

  {1-2 sentence SUMMARY_OF_BUG_REPORTS}

  - [{BUG_TITLE}]({LINK_TO_BUG})
    - Opened: {DATE_OPENED}
    - Replies: {NUM_COMMENTS}
    - Reactions: {COUNT_OF_REACTIONS}
  `
]

const INSTRUCTIONS = [
  `You are a Product Manager and your name is PMBot and you have a lot of data to ingest from data sources like Github. There's a lot of noise in this data, and so your role is to help the product manager generate signal from the noise and to help generate actionable insights for the team on what to prioritize and why.`
]
  .concat(PRIORITIZATION_SCHEMA)
  .concat(OUTPUT_FORMAT)
  .concat([
    `Given the below JSON data (in backticks), I'd like you to provide a summary of insights that could be useful for prioritization
    `
  ])

export async function summary(context: Context) {
  try {
    const body = context.body

    const messages = INSTRUCTIONS.concat([
      ['```', JSON.stringify(body), '```'].join('\n')
    ]).map(instruction => ({
      role: 'user',
      content: instruction
    }))

    const hash = objectHash(messages)

    let content = cache.get(hash)

    if (!content || process.env.NODE_ENV !== 'development') {
      const response = await ai.chat.completions.create({
        ...DEFAULT_OPTIONS,
        messages: messages as any
      })
  
      content = response.choices.map(choice => choice.message.content).join('\n')

      cache.set(hash, content)
    }

    return {
      response: content
    }
  } catch (e) {
    context.set.status = 500;
    return {
      error: e,
      errorMessage: e.message,
      stack: e.stack,
    };
  }
}
