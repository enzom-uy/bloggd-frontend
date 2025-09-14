import { useEffect, useRef, useState } from "react"

interface Props {
  data:
    | { message: string; games: { name: string; igdbId: number }[] }
    | null
    | undefined
  isLoading: boolean
}

export const useHandlerSearchPopover = ({ data, isLoading }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".popover-content")
      ) {
        setIsPopoverOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputFocus = () => {
    inputRef.current?.focus()
    if (inputRef.current && inputRef.current.value !== "")
      return setIsPopoverOpen(true)

    if (data && data.games?.length > 0) {
      setIsPopoverOpen(true)
    } else {
      setIsPopoverOpen(false)
    }
  }

  useEffect(() => {
    if ((data && data.games?.length > 0) || isLoading) {
      setIsPopoverOpen(true)
    }
  }, [data, isLoading])

  return { isPopoverOpen, inputRef, handleInputFocus }
}
