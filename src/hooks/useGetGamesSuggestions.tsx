import { useQuery } from "@tanstack/react-query"
import { API_URLS, QUERY_API_BODY } from "@/utils/constants"
import type { APIError } from "@/lib/types"

interface Props {
  userInput: string
  lastUserInput?: string
  sessionToken?: string | null
}

interface GamesSuggestions {
  message: string
  games: { name: string; igdbId: number }[]
}

export const useGetGamesSuggestions = ({
  userInput,
  lastUserInput,
  sessionToken,
}: Props) => {
  const url = new URL(API_URLS.GAMES_SUGGESTIONS)
  url.searchParams.append("game_name", userInput)
  const { data, isLoading, isFetched, error } = useQuery({
    queryKey: ["gamesSuggestions", userInput],
    queryFn: async () => {
      console.log("🔍 Executing game search request for:", userInput)
      const res = await fetch(url.toString(), QUERY_API_BODY(sessionToken))
      if (!res.ok) {
        const errorData = (await res.json()) as APIError
        throw new Error(errorData.message[0])
      }
      const data = (await res.json()) as GamesSuggestions

      return data
    },
    enabled: !!userInput && userInput.trim().length > 0,
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })

  return { data, isLoading, isFetched, error }
}
