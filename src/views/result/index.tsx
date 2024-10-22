import React, { useState } from "react"
import useInfiniteScroll, {
  type ScrollDirectionBooleanState
} from "react-easy-infinite-scroll-hook"

import ExampleCard from "./components/ExampleCard"
import Item from "./components/Item"
import { createItems, createNext, getSourceUrl } from "./utils"

const ReversedVerticalList = () => {
  const [data, setData] = useState(createItems())
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState<ScrollDirectionBooleanState>({
    up: true,
    down: false
  })

  const ref = useInfiniteScroll<HTMLDivElement>({
    next: createNext({ setData, setLoading, offset: 10, reverse: true }),
    rowCount: data.length,
    hasMore,
    reverse: { column: true }
  })

  return (
    <ExampleCard
      title="Reversed Vertical List"
      hasMore={hasMore}
      onChangeHasMore={setHasMore}
      loading={loading}
      source={getSourceUrl("ReversedVerticalList")}>
      <div
        ref={ref}
        className="List"
        style={{
          height: "70vh",
          width: "60vw",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse"
        }}>
        {data.map((item, index) => (
          <Item
            key={item}
            index={index}
            className="Row-reverse"
            content={item}
          />
        ))}
      </div>
    </ExampleCard>
  )
}

export default ReversedVerticalList
