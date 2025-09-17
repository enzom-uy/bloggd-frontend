import type { games } from "drizzle/schema"
import { DateTime } from "luxon"

interface Props {
  game: typeof games.$inferSelect
}

// TODO: implement click highlight and search for games with that filter
const Highlight = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-foreground font-semibold">{children}</span>
}

export const GameContent: React.FC<Props> = ({ game }) => {
  const date = DateTime.fromISO(game.releaseDate as string)
  const formattedDate = date.toLocaleString(DateTime.DATE_FULL)
  return (
    <div>
      <h1 className="text-2xl">{game.title}</h1>
      <p className="text-white/60">
        Released on <Highlight>{formattedDate}</Highlight> by
        <Highlight> {game.developer}</Highlight>,
        <Highlight> {game.publisher}</Highlight>
      </p>
    </div>
  )
}

export default GameContent
