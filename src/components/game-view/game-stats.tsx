import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { GameStatsItem } from "@/components/game-view/game-stats-item"
import { fetchGameStats } from "@/api/games"
import { Gamepad2, Play, Library, Trash2 } from "lucide-react"

interface Props {
  igdbId: string
  sessionToken?: string
}

export const GameStats = async ({ igdbId, sessionToken }: Props) => {
  const response = await fetchGameStats({ id: igdbId, sessionToken })
  return (
    <Card className="w-full py-4">
      <CardContent className="grid grid-rows-2 px-4 sm:flex sm:flex-col">
        {response ? (
          <>
            <div className="grid grid-cols-2 gap-4 border-b pb-4 sm:flex sm:flex-col sm:gap-0 sm:border-b-0 sm:pb-0">
              <GameStatsItem
                icon={<Gamepad2 strokeWidth={1.3} className="h-6 w-6" />}
                label="Played"
                value={response.playedCount}
              />
              <GameStatsItem
                icon={<Play strokeWidth={1.3} className="h-6 w-6" />}
                label="Playing"
                value={response.playingCount}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:gap-0">
              <GameStatsItem
                icon={<Library strokeWidth={1.3} className="h-6 w-6" />}
                label="Backlog"
                value={response.backlogCount}
              />
              <GameStatsItem
                icon={<Trash2 strokeWidth={1.3} className="h-6 w-6" />}
                label="Dropped"
                value={response.droppedCount}
              />
            </div>
          </>
        ) : (
          <ul>
            <li>No data available yet.</li>
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
