import type { APIError } from "@/lib/types"
import { API_URLS, QUERY_API_BODY } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

interface Props {
  igdbId: number
  sessionToken?: string
}

interface GamePlatforms {
  id: string
  slug: string
  abbreviation: string
}

export const fetchGamePlatforms = async ({ igdbId, sessionToken }: Props) => {
  const res = await fetch(
    `${API_URLS.GET_GAME_BY_ID}${igdbId}/platforms?abbreviated=true`,
    QUERY_API_BODY(sessionToken),
  )
  if (!res.ok) {
    const errorData = (await res.json()) as APIError
    throw new Error(errorData.message[0])
  }
  const data = (await res.json()) as GamePlatforms[]
  return data
}
