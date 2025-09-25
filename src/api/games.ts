import { games, gameStats } from "drizzle/schema"
import { API_URLS, QUERY_API_BODY } from "@/utils/constants"

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

  if (!response.game) return undefined

  return response as FetchGameSuccess
}

export interface FetchGameSuccess {
  message: string
  game: typeof games.$inferSelect
}

export const fetchGameStats = async ({ id, sessionToken }: Props) => {
  const getStatsUrl = new URL(
    `${API_URLS.BASE_URL}/games/${id}/stats`,
  ).toString()
  const response = await fetch(getStatsUrl, QUERY_API_BODY(sessionToken)).then(
    (res) => res.json(),
  )

  if (!response) return
  return response as typeof gameStats.$inferSelect
}
