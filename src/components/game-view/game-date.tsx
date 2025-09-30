// TODO: implement click highlight and search for games with that filter
const Highlight = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-foreground font-semibold">{children}</span>
}

interface Props {
  date: string
  developer: string | null
  publisher: string | null
}

export const GameDate = ({ date, developer, publisher }: Props) => {
  return (
    <p className="text-white/60">
      Released on <Highlight>{date}</Highlight>
      {(developer || publisher) && (
        <>
          {" by"}
          {developer && <Highlight> {developer}</Highlight>}
          {publisher && (
            <>
              ,<Highlight> {publisher}</Highlight>
            </>
          )}
        </>
      )}
    </p>
  )
}
