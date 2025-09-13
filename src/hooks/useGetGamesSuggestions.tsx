import { useQuery } from "@tanstack/react-query"
import { GAMES_SUGGESTIONS_URL, QUERY_API_BODY } from "@/utils/constants"

interface Props {
  userInput: string
  lastUserInput: string
  sessionToken: string
}

export const useGetGamesSuggestions = ({
  userInput,
  lastUserInput,
  sessionToken,
}: Props) => {
  const url = new URL(GAMES_SUGGESTIONS_URL)
  url.searchParams.append("game_name", userInput)
  const { data, isLoading, isFetched, error } = useQuery({
    queryKey: ["gamesSuggestions"],
    queryFn: async () => {
      if (!userInput || userInput === lastUserInput) return null
      const res = await fetch(
        url.toString(),
        QUERY_API_BODY(sessionToken),
      ).then(
        (res) =>
          res.json() as Promise<{
            message: string
            games: { name: string; igdbId: number }[]
          }>,
      )

      return res
    },
    enabled: !!userInput,
  })

  return { data, isLoading, isFetched, error }
}
