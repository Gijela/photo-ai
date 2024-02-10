import { NextApiRequest, NextApiResponse } from "next";
// import { Ratelimit } from "@upstash/ratelimit";
// import redis from "../../../utils/redis";

// Create a new ratelimiter, that allows 5 requests per 24 hours
// const ratelimit = redis
//   ? new Ratelimit({
//       redis: redis,
//       limiter: Ratelimit.fixedWindow(5, "1440 m"),
//       analytics: true,
//     })
//   : undefined;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Rate Limiter Code
    // if (ratelimit) {
    //   const ipIdentifier =
    //     req.headers["x-real-ip"] || req.connection.remoteAddress;

    //   const result = await ratelimit.limit(ipIdentifier);

    //   if (!result.success) {
    //     res.setHeader("X-RateLimit-Limit", String(result.limit));
    //     res.setHeader("X-RateLimit-Remaining", String(result.remaining));
    //     return res.status(429).json({
    //       error: "Too many requests in a 24-hour period.",
    //     });
    //   }
    // }

    const { imageUrl, theme, room } = req.body;

    // POST request to Replicate to start the image restoration generation process
    let replicateResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        },
        body: JSON.stringify({
          version:
            "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
          input: {
            image: imageUrl,
            prompt:
              room === "Gaming Room"
                ? "a room for gaming with gaming computers, gaming consoles, and gaming chairs"
                : `a ${theme.toLowerCase()} ${room.toLowerCase()}`,
            // Additional parameters, if needed for Replicate
          },
        }),
      }
    );

    let jsonStartResponse = await replicateResponse.json();

    let endpointUrl = jsonStartResponse.urls.get;

    // Polling the Replicate API for the result, with try and catch to handle any errors or timeouts
    let restoredImage = null;
    try {
      restoredImage = await pollReplicateForImage(endpointUrl);
    } catch (error) {
      console.error("Error polling Replicate for image: ", error);
      return res.status(500).json({
        error: "Error while generating the image.",
      });
    }

    // Return the generated image or an error message
    return res.status(200).json({
      image: restoredImage ? restoredImage : "Failed to generate image.",
    });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Helper function to poll the Replicate API for results
async function pollReplicateForImage(endpointUrl: string) {
  for (let attempt = 0; attempt < 60; attempt++) {
    // 1 minute timeout
    let statusResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
    });

    let jsonStatusResponse = await statusResponse.json();

    if (jsonStatusResponse.status === "succeeded") {
      return jsonStatusResponse.output;
    } else if (jsonStatusResponse.status === "failed") {
      throw new Error("Image generation failed at Replicate.");
    }

    // Wait 1 second before the next poll
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Image generation timed out.");
}
