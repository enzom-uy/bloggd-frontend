import type { games } from "drizzle/schema"
import { API_URLS, QUERY_API_BODY } from "./constants"

interface Props {
  id: string
  sessionToken: string | undefined | null
}

export const fetchGameById = async ({
  id,
  sessionToken,
}: Props): Promise<FetchGameSuccess | undefined> => {
  const response = await fetch(
    `${API_URLS.GET_GAME_BY_ID}${id}`,
    QUERY_API_BODY(sessionToken),
  ).then((res) => res.json())

  console.log("Response from fetchGameById: ", response)

  if (!response.game) return undefined

  return response as FetchGameSuccess
}

export interface FetchGameSuccess {
  message: string
  game: typeof games.$inferSelect
}
