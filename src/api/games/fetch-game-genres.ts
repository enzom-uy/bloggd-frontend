import { API_URLS, QUERY_API_BODY } from "@/utils/constants"
import type { APIError } from "better-auth"

interface Props {
  igdbId: number
  sessionToken?: string
  gameId: string
}

export const fetchGameGenres = async ({
  igdbId,
  sessionToken,
  gameId,
}: Props) => {
  const res = await fetch(
    `${API_URLS.GET_GAME_BY_ID}${igdbId}/genres?game_id=${gameId}`,
    QUERY_API_BODY(sessionToken),
  )

  if (!res.ok) {
    const errorData = (await res.json()) as APIError
    throw new Error(errorData.message[0])
  }

  const data = await res.json()
  return data
}
