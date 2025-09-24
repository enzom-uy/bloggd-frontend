interface Props {
  description?: string | null
}

export const GameDescription: React.FC<Props> = ({ description }) => {
  return (
    <div>
      {/* TODO: implement "Show more" button */}
      <p className="text-white/60">
        {description
          ? description
          : "There is no description for this game yet."}
      </p>
    </div>
  )
}
