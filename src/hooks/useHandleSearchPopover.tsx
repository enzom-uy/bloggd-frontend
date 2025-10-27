import { useEffect, useRef, useState, useCallback } from "react"

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
  const popoverRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node

    if (
      inputRef.current &&
      !inputRef.current.contains(target) &&
      !target.parentElement?.closest('[role="dialog"]') &&
      !(target as HTMLElement).closest("[data-radix-popper-content-wrapper]")
    ) {
      setIsPopoverOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isPopoverOpen, handleClickOutside])

  const handleInputFocus = () => {
    inputRef.current?.focus()

    if ((data && data.games && data.games.length > 0) || isLoading) {
      setIsPopoverOpen(true)
    }
  }

  useEffect(() => {
    if (isLoading) {
      setIsPopoverOpen(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (data && data.games && data.games.length > 0) {
      setIsPopoverOpen(true)
    }
  }, [data])

  return { isPopoverOpen, inputRef, handleInputFocus, popoverRef }
}
