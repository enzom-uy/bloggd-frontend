interface Props {
  icon: React.ReactNode
  label: string
  value: number | null
}

export const GameStatsItem = ({ icon, label, value }: Props) => {
  return (
    <div className="flex min-h-10 items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center">{icon}</span>
        <span>{label}:</span>
      </div>
      <span>{value}</span>
    </div>
  )
}
