import { auth } from "@/lib/auth-server"
import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware(async (context, next) => {
  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  })

  if (isAuthed) {
    console.log("User is authed")
    context.locals.user = isAuthed.user
    context.locals.session = isAuthed.session
  } else {
    console.log("User is not authed")
    context.locals.user = null
    context.locals.session = null
  }

  return next()
})
