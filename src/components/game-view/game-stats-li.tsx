interface Props {
  icon: React.ReactNode
  label: string
  value: number | null
}

export const GameStatsLi = ({ icon, label, value }: Props) => {
  return (
    <li className="flex justify-between">
      <div className="flex items-center gap-2">
        {icon} {label}:
      </div>
      <span>{value}</span>
    </li>
  )
}
