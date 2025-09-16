import { useEffect, useRef, useState } from "react"

interface Props {
  data:
    | { message: string; games: { name: string; igdbId: number }[] }
    | null
    | undefined
  isLoading: boolean
  error: Error | null
}

export const useHandlerSearchPopover = ({ data, isLoading, error }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!data) return
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
    if (!data) return
    inputRef.current?.focus()
    if (inputRef.current && inputRef.current.value !== "") {
      setIsPopoverOpen(true)
    }

    if (data && data.games?.length > 0) {
      setIsPopoverOpen(true)
    } else {
      setIsPopoverOpen(false)
    }
  }

  useEffect(() => {
    if (isLoading) {
      setIsPopoverOpen(true)
    }
  }, [isLoading])

  inputRef.current?.focus()

  return { isPopoverOpen, inputRef, handleInputFocus }
}
