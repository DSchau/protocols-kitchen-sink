import OpenAI from 'openai'

const { 
  OPENAPI_KEY
} = process.env

if (!OPENAPI_KEY) {
  throw new Error('missing environment variable: OPENAPI_KEY')
}

export const DEFAULT_OPTIONS = {
  model: 'gpt-4-1106-preview'
}

export const ai = new OpenAI({
  apiKey: OPENAPI_KEY
})
