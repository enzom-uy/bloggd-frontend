import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import { useQuery } from "@tanstack/react-query"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandItem, CommandList } from "./ui/command"
import { useHandlerSearchPopover } from "@/hooks/useHandleSearchPopover"
import { QueryWrapper } from "./query-wrapper"
import type { Session } from "@/lib/auth-client"
import { useGetGamesSuggestions } from "@/hooks/useGetGamesSuggestions"

function useGetUserInputDelay(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

interface Props {
  sessionProp: Session
}

const SearchInputContent: React.FC<Props> = ({ sessionProp }: Props) => {
  const [inputValue, setInputValue] = useState("")
  const userInput = useGetUserInputDelay(inputValue, 500)

  // TODO: implement error states
  const { data, isLoading, isFetched, error } = useGetGamesSuggestions({
    userInput: userInput,
    sessionToken: sessionProp.session.id,
  })

  const { handleInputFocus, isPopoverOpen, inputRef } = useHandlerSearchPopover(
    { data, isLoading },
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const games = data?.games

  return (
    <div className="flex flex-col gap-4">
      <Input
        className="max-w-80"
        type="search"
        placeholder="Search..."
        value={inputValue}
        ref={inputRef}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onClick={handleInputFocus}
      />

      <Popover open={isPopoverOpen}>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              {isLoading && "Loading..."}
              {error && <div>{error.message}</div>}
              {games && games.length > 0 && (
                <>
                  {data.games.map((game) => (
                    <CommandItem
                      key={game.igdbId}
                      value={`${game.igdbId}`}
                      onSelect={() =>
                        (window.location.href = `/games/${game.igdbId}`)
                      }
                    >
                      {game.name} - {game.igdbId}
                    </CommandItem>
                  ))}
                </>
              )}
              {!isLoading && !error && (!games || games.length === 0) && (
                <div>No results found</div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-col gap-2"></div>
    </div>
  )
}

export const SearchInput: React.FC<Props> = ({ sessionProp }: Props) => {
  return (
    <QueryWrapper>
      <SearchInputContent sessionProp={sessionProp} />
    </QueryWrapper>
  )
}

export default SearchInput
