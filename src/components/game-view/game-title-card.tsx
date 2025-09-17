import type { User } from "better-auth"
import { games } from "drizzle/schema"
import { DateTime } from "luxon"

interface Props {
  userSession: User | undefined
  game: typeof games.$inferSelect
}

export const GameTitleCard = ({ userSession, game }: Props) => {
  return (
    <>
      <div className="flex gap-4">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt="Cover image for the game"
            className="max-w-48 rounded border"
          />
        ) : (
          <div className="flex h-64 w-48 items-center justify-center overflow-hidden rounded bg-zinc-800 p-8 text-center">
            {game.title}
          </div>
        )}
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
