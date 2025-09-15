import type { User } from "better-auth"
import { games } from "drizzle/schema"

interface Props {
  userSession: User | undefined
  game: typeof games.$inferSelect
}

export const GameTitleCard = ({ userSession, game }: Props) => {
  return (
    <div>
      <div className="max-w-48">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt="Cover image for the game"
            className="rounded border"
          />
        ) : null}
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
    </div>
  )
}
