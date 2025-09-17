import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export const GameStatsSkeleton = () => {
  return (
    <Card className="max-w-sm animate-pulse">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32 rounded bg-gray-300" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <Skeleton className="h-4 w-40 rounded bg-gray-300" />
          </li>
          <li>
            <Skeleton className="h-4 w-40 rounded bg-gray-300" />
          </li>
          <li>
            <Skeleton className="h-4 w-40 rounded bg-gray-300" />
          </li>
          <li>
            <Skeleton className="h-4 w-40 rounded bg-gray-300" />
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
