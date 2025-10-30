import type React from "react"
import { fetchGameGenres } from "@/api/games/fetch-game-genres"

interface Props {
  igdbId: number
  sessionToken?: string
  gameId: string
}

export const GameGenres: React.FC<Props> = async ({
  igdbId,
  sessionToken,
  gameId,
}) => {
  const genres = await fetchGameGenres({ igdbId, sessionToken, gameId })
  return (
    <ul className="flex flex-wrap items-center gap-2 pt-4">
      Hola soy game genres
    </ul>
  )
}

export default GameGenres
