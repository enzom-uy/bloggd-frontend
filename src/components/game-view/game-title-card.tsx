import type { User } from "better-auth"
import { games } from "drizzle/schema"
import { DateTime } from "luxon"

interface Props {
  userSession: User | undefined
  game: typeof games.$inferSelect
}

export const GameTitleCard = ({ userSession, game }: Props) => {
  const date = DateTime.fromISO(game.releaseDate as string)
  const formattedDate = date.toLocaleString(DateTime.DATE_FULL)
  return (
    <>
      <div className="flex items-start gap-8">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt="Cover image for the game"
            className="h-auto max-h-64 w-full min-w-40 rounded object-contain"
          />
        ) : (
          <div className="flex h-64 w-48 items-center justify-center overflow-hidden rounded bg-zinc-800 p-8 text-center">
            {game.title}
          </div>
        )}
        <div className="max-w-80 lg:hidden">
          <h1 className="text-lg">{game.title}</h1>
          <p className="text-accent-foreground/50 text-sm">
            Released on {formattedDate} by {game.developer}, {game.publisher}
          </p>
        </div>
      </div>
      {/* TODO: implement*/}
      {userSession ? (
        <></>
      ) : (
        <div>
          <span className="text-pink-500">Log in</span> to access rating
          features
        </div>
      )}
    </>
  )
}
