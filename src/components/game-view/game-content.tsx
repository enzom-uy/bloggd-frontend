import type { games } from "drizzle/schema"
import { DateTime } from "luxon"
import { GameDescription } from "./game-description"
import { GameDate } from "./game-date"

interface Props {
  game: typeof games.$inferSelect
}

export const GameContent: React.FC<Props> = ({ game }) => {
  const date = DateTime.fromISO(game.releaseDate as string)
  const formattedDate = date.toLocaleString(DateTime.DATE_FULL)
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden sm:block">
        <h1 className="text-2xl">{game.title}</h1>
        <GameDate
          date={game.releaseDate ? formattedDate : null}
          developer={game.developer}
          publisher={game.publisher}
        />
      </div>
      <GameDescription description={game.description} />
    </div>
  )
}

export default GameContent
