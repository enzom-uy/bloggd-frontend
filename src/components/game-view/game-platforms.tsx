import { fetchGamePlatforms } from "@/api/games/fetch-game-platforms"
import type React from "react"
import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"

interface Props {
  igdbId: number
  sessionToken?: string
}

export const GamePlatforms: React.FC<Props> = async ({
  igdbId,
  sessionToken,
}) => {
  const platforms = await fetchGamePlatforms({ igdbId, sessionToken })
  return (
    <ul className="flex flex-wrap items-center gap-2 pt-4">
      {platforms.map((p) => (
        <Badge asChild key={p.id}>
          <li>{p.abbreviation}</li>
        </Badge>
      ))}
    </ul>
  )
}

export const GamePlatformsSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-16 animate-pulse rounded-2xl" />
      <Skeleton className="h-5 w-16 animate-pulse rounded-2xl" />
      <Skeleton className="h-5 w-16 animate-pulse rounded-2xl" />
      <Skeleton className="h-5 w-16 animate-pulse rounded-2xl" />
    </div>
  )
}
