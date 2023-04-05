//https://www.dhairyashah.dev/posts/implementing-rate-limiting-for-nextjs-api-routes-with-upstash-and-redis/
//https://github.com/openai/openai-quickstart-node
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Configuration, OpenAIApi } from "openai";
import { maxNumberOfRequests, requestResetTimeInSeconds } from "@/settings/ratelimits";

//////////////////////////////////////////////
//Rate Limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(maxNumberOfRequests, `${requestResetTimeInSeconds} s`),
});
//////////////////////////////////////////////
//OpenAI ChatGPT API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//////////////////////////////////////////////

export default async function handler(req, res) {
/*   const identifier = "api";
  const rateLimitResult = await ratelimit.limit(identifier);
  res.setHeader('X-RateLimit-Limit', rateLimitResult.limit)
  res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining)

  if (!rateLimitResult.success) {
      res.status(429).json({ message: 'The request has been rate limited.', rateLimitState: rateLimitResult })
      return
  } */

  let rateLimitResult = 0;
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured.",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${process.env.CHATGPT_PROMPT}${req.body.sentence}:`,
      temperature: 0.8,
      max_tokens: 60,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n"]
    });
    res.status(200).json({ result: completion.data.choices[0].text, rateLimitState: rateLimitResult });
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
