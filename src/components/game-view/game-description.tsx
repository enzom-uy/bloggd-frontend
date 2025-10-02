import { useState, useLayoutEffect, useRef } from "react"

interface Props {
  description?: string | null
}

interface TruncatedElementProps {
  ref: React.RefObject<HTMLParagraphElement | null>
}

const useTruncatedElement = ({ ref }: TruncatedElementProps) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const [isShowingMore, setIsShowingMore] = useState(false)

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref?.current || {}

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true)
    } else {
      setIsTruncated(false)
    }
  }, [ref])

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev)

  return {
    isTruncated,
    isShowingMore,
    toggleIsShowingMore,
  }
}

export const GameDescription: React.FC<Props> = ({ description }) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({ ref })

  if (!description) {
    return (
      <div>
        <p className="text-ellipsis text-white/60">
          There is no description for this game yet.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p
        className={`max-w-[60ch] break-words transition-all duration-300 ease-in-out ${
          !isShowingMore ? "line-clamp-5" : ""
        }`}
        ref={ref}
      >
        {description}
      </p>
      {isTruncated && (
        <div className="mt-4 flex items-center gap-4">
          <div className="h-0.5 w-full bg-white/10" />
          <button
            className="cursor-pointer whitespace-nowrap text-white/60 transition-colors hover:text-white"
            onClick={toggleIsShowingMore}
          >
            {isShowingMore ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  )
}
