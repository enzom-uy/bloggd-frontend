import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { GameStatsLi } from "@/components/game-view/game-stats-li"
import { fetchGameStats } from "@/api/games"
import { Gamepad2, Play, Library, Trash2 } from "lucide-react"

interface Props {
  igdbId: string
  sessionToken?: string
}

export const GameStats = async ({ igdbId, sessionToken }: Props) => {
  const response = await fetchGameStats({ id: igdbId, sessionToken })
  return (
    <Card className="w-full max-w-72 min-w-fit">
      <CardHeader>
        <CardTitle className="text-center text-nowrap">Game Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {response ? (
          <ul className="flex w-full flex-col gap-2 font-light">
            <GameStatsLi
              icon={<Gamepad2 strokeWidth={1.3} />}
              label="Played"
              value={response.playedCount}
            />
            <GameStatsLi
              icon={<Play strokeWidth={1.3} />}
              label="Playing"
              value={response.playingCount}
            />
            <GameStatsLi
              icon={<Library strokeWidth={1.3} />}
              label="Backlog"
              value={response.backlogCount}
            />
            <GameStatsLi
              icon={<Trash2 strokeWidth={1.3} />}
              label="Dropped"
              value={response.droppedCount}
            />
          </ul>
        ) : (
          <ul>
            <li>No data available yet.</li>
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
