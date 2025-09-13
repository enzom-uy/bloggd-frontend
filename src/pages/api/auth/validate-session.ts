import { auth } from "@/lib/auth-server"
import type { APIContext, APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async (context: APIContext) => {
  const { request } = context
  console.log("Request: ", request)
  const token = "sdfjnasdkfjnasdf"
  const userSession = await auth.api.getSession({
    headers: request.headers,
  })
  console.log("Session: ", userSession)

  if (!userSession?.user) {
    return new Response(
      JSON.stringify({
        valid: false,
      }),
      {
        status: 401,
        headers: {
          "Contenet-Type": "application/json",
        },
      },
    )
  }
  return new Response(JSON.stringify({ valid: true }), {
    status: 200,
    headers: { "Contenet-Type": "application/json" },
  })
}
